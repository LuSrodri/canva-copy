/**
 * Classe responsável pelo gerenciamento e processamento de imagens
 * Estados possíveis: 'queued', 'processing', 'ready'
 */
class ImagesProcessor {
    constructor() {
        this.images = new Map(); // Map<id, ImageItem>
        this.processingQueue = [];
        this.currentlyProcessing = null;
        this.nextId = 1;
        this.onStateChange = null; // Callback para mudanças de estado
        this.onQueueChange = null; // Callback para mudanças na fila
        this.inferenceWorker = null;
        this.pendingRequests = new Map();
        this.nextRequestId = 1;
        this.isProcessorReady = false;
        this.preloadedImages = new Map(); // Cache das imagens de exemplo
        
        this.initializeWorker();
        this.preloadExampleImages();
    }

    /**
     * Inicializa o Web Worker para processamento de IA
     */
    initializeWorker() {
        this.inferenceWorker = new Worker('./inference_ai.js', { type: 'module' });
        
        this.inferenceWorker.onmessage = (event) => {
            const { id, result, error, success } = event.data;

            if (success) {
                this.isProcessorReady = true;
                if (this.onStateChange) {
                    this.onStateChange('processor-ready');
                }
                return;
            }

            if (!id) {
                if (error && this.onStateChange) {
                    this.onStateChange('processor-error', { error });
                }
                return;
            }

            const { resolve, reject } = this.pendingRequests.get(id);
            this.pendingRequests.delete(id);

            if (error) {
                reject(new Error(error));
            } else {
                resolve(result);
            }
        };
    }

    /**
     * Pré-carrega as imagens de exemplo para melhorar a performance
     */
    async preloadExampleImages() {
        const exampleUrls = [
            'assets/images/examples/tree.png',
            'assets/images/examples/plane.jpg',
            'assets/images/examples/father-daughter-walking.jpg',
            'assets/images/examples/beside-pool.jpg'
        ];

        for (const url of exampleUrls) {
            try {
                const fullUrl = new URL(url, window.location.origin).toString();
                const response = await fetch(fullUrl);
                const blob = await response.blob();
                this.preloadedImages.set(url, blob);
            } catch (error) {
                console.warn(`Failed to preload image: ${url}`, error);
            }
        }
    }

    /**
     * Adiciona uma nova imagem à fila de processamento
     */
    addImage(file, originalName = null) {
        const id = this.nextId++;
        const fileName = originalName || file.name;
        
        // Sempre inicia como 'queued' para garantir fluxo consistente
        const imageItem = {
            id,
            file,
            originalName: fileName,
            state: 'queued',
            originalImage: null,
            processedImage: null,
            processedResult: null,
            addedAt: new Date()
        };

        this.images.set(id, imageItem);
        this.processingQueue.push(id);

        if (this.onStateChange) {
            this.onStateChange('image-added', { imageItem });
        }

        if (this.onQueueChange) {
            this.onQueueChange(this.getQueueInfo());
        }

        // Inicia o processamento se não houver nenhuma imagem sendo processada
        // Adiciona um pequeno delay para garantir que o DOM seja renderizado primeiro
        setTimeout(() => {
            this.processNextInQueue();
        }, 10);

        return id;
    }

    /**
     * Adiciona uma imagem de exemplo usando URL
     */
    async addExampleImage(url) {
        try {
            let blob;
            
            // Verifica se a imagem já foi pré-carregada
            if (this.preloadedImages.has(url)) {
                blob = this.preloadedImages.get(url);
            } else {
                // Carrega a imagem se não estiver no cache
                const fullUrl = new URL(url, window.location.origin).toString();
                const response = await fetch(fullUrl);
                blob = await response.blob();
            }

            // Extrai o nome original do arquivo da URL
            const urlParts = url.split('/');
            const originalName = urlParts[urlParts.length - 1];
            
            // Remove o prefixo "reduced" se existir no nome
            const cleanName = originalName.replace('-reduced', '');
            
            const file = new File([blob], cleanName, { type: blob.type });
            return this.addImage(file, cleanName);
        } catch (error) {
            console.error('Error adding example image:', error);
            if (this.onStateChange) {
                this.onStateChange('error', { error: 'Failed to load example image' });
            }
            return null;
        }
    }

    /**
     * Remove uma imagem (apenas se não estiver sendo processada)
     */
    removeImage(id) {
        const imageItem = this.images.get(id);
        if (!imageItem) return false;

        // Não permite remover se estiver sendo processada
        if (imageItem.state === 'processing') {
            return false;
        }

        // Remove da fila se ainda não foi processada
        const queueIndex = this.processingQueue.indexOf(id);
        if (queueIndex > -1) {
            this.processingQueue.splice(queueIndex, 1);
        }

        this.images.delete(id);

        if (this.onStateChange) {
            this.onStateChange('image-removed', { id });
        }

        if (this.onQueueChange) {
            this.onQueueChange(this.getQueueInfo());
        }

        return true;
    }

    /**
     * Processa a próxima imagem na fila
     */
    async processNextInQueue() {
        if (this.currentlyProcessing || this.processingQueue.length === 0 || !this.isProcessorReady) {
            return;
        }

        const nextId = this.processingQueue.shift();
        const imageItem = this.images.get(nextId);
        
        if (!imageItem) return;

        this.currentlyProcessing = nextId;
        
        // Sempre muda o estado para 'processing' e emite o evento
        imageItem.state = 'processing';
        if (this.onStateChange) {
            this.onStateChange('processing-started', { imageItem });
        }

        try {
            const result = await this.processImage(imageItem.file);
            
            imageItem.state = 'ready';
            imageItem.processedResult = result;
            this.currentlyProcessing = null;

            if (this.onStateChange) {
                this.onStateChange('processing-completed', { imageItem });
            }

            // Processa a próxima imagem na fila
            this.processNextInQueue();

        } catch (error) {
            imageItem.state = 'error';
            this.currentlyProcessing = null;

            if (this.onStateChange) {
                this.onStateChange('processing-error', { imageItem, error });
            }

            // Continua processando a próxima imagem mesmo com erro
            this.processNextInQueue();
        }

        if (this.onQueueChange) {
            this.onQueueChange(this.getQueueInfo());
        }
    }

    /**
     * Processa uma imagem usando o Web Worker
     */
    async processImage(file) {
        return new Promise((resolve, reject) => {
            const id = this.nextRequestId++;
            this.pendingRequests.set(id, { resolve, reject });
            this.inferenceWorker.postMessage({ id, file });
        });
    }

    /**
     * Obtém informações sobre uma imagem específica
     */
    getImage(id) {
        return this.images.get(id);
    }

    /**
     * Obtém todas as imagens
     */
    getAllImages() {
        return Array.from(this.images.values());
    }

    /**
     * Obtém informações sobre a fila de processamento
     */
    getQueueInfo() {
        return {
            queueLength: this.processingQueue.length,
            currentlyProcessing: this.currentlyProcessing,
            totalImages: this.images.size,
            readyImages: this.getAllImages().filter(img => img.state === 'ready').length,
            processingImages: this.getAllImages().filter(img => img.state === 'processing').length,
            queuedImages: this.getAllImages().filter(img => img.state === 'queued').length
        };
    }

    /**
     * Verifica se uma imagem pode ser removida
     */
    canRemoveImage(id) {
        const imageItem = this.images.get(id);
        return imageItem && imageItem.state !== 'processing';
    }

    /**
     * Obtém o estado do processador
     */
    getProcessorState() {
        return {
            isReady: this.isProcessorReady,
            isProcessing: this.currentlyProcessing !== null,
            queueInfo: this.getQueueInfo()
        };
    }

    /**
     * Limpa todas as imagens (apenas as que não estão sendo processadas)
     */
    clearAllImages() {
        const imagesToRemove = [];
        
        for (const [id, imageItem] of this.images) {
            if (imageItem.state !== 'processing') {
                imagesToRemove.push(id);
            }
        }

        imagesToRemove.forEach(id => this.removeImage(id));
        
        return imagesToRemove.length;
    }

    /**
     * Define o callback para mudanças de estado
     */
    setStateChangeCallback(callback) {
        this.onStateChange = callback;
    }

    /**
     * Define o callback para mudanças na fila
     */
    setQueueChangeCallback(callback) {
        this.onQueueChange = callback;
    }
}

export { ImagesProcessor };