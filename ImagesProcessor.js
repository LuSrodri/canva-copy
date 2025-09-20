/**
 * Classe responsável pelo gerenciamento e processamento de imagens
 * Estados possíveis: 'queued', 'processing', 'ready'
 */
class ImagesProcessor {
    constructor() {
        this.images = new Map();
        this.processingQueue = [];
        this.currentlyProcessing = null;
        this.nextId = 1;
        this.onStateChange = null;
        this.onQueueChange = null;
        this.inferenceWorker = null;
        this.pendingRequests = new Map();
        this.nextRequestId = 1;
        this.isProcessorReady = false;
        this.preloadedImages = new Map();
        
        this.initializeWorker();
        this.preloadExampleImages();
    }

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

    addImage(file, originalName = null) {
        const id = this.nextId++;
        const fileName = originalName || file.name;
        
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

        setTimeout(() => {
            this.processNextInQueue();
        }, 10);

        return id;
    }

    async addExampleImage(url) {
        try {
            let blob;
            
            if (this.preloadedImages.has(url)) {
                blob = this.preloadedImages.get(url);
            } else {
                const fullUrl = new URL(url, window.location.origin).toString();
                const response = await fetch(fullUrl);
                blob = await response.blob();
            }

            const urlParts = url.split('/');
            const originalName = urlParts[urlParts.length - 1];
            
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

    removeImage(id) {
        const imageItem = this.images.get(id);
        if (!imageItem) return false;

        if (imageItem.state === 'processing') {
            return false;
        }

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

    async processNextInQueue() {
        if (this.currentlyProcessing || this.processingQueue.length === 0) {
            return;
        }

        // Aguardar até que o modelo esteja pronto
        if (!this.isProcessorReady) {
            // Aguarda um pouco e tenta novamente
            setTimeout(() => {
                this.processNextInQueue();
            }, 100);
            return;
        }

        const nextId = this.processingQueue.shift();
        const imageItem = this.images.get(nextId);
        
        if (!imageItem) return;

        this.currentlyProcessing = nextId;
        
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

            this.processNextInQueue();

        } catch (error) {
            imageItem.state = 'error';
            this.currentlyProcessing = null;

            if (this.onStateChange) {
                this.onStateChange('processing-error', { imageItem, error });
            }

            this.processNextInQueue();
        }

        if (this.onQueueChange) {
            this.onQueueChange(this.getQueueInfo());
        }
    }

    async processImage(file) {
        return new Promise((resolve, reject) => {
            const id = this.nextRequestId++;
            this.pendingRequests.set(id, { resolve, reject });
            this.inferenceWorker.postMessage({ id, file });
        });
    }

    getImage(id) {
        return this.images.get(id);
    }

    getAllImages() {
        return Array.from(this.images.values());
    }

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

    canRemoveImage(id) {
        const imageItem = this.images.get(id);
        return imageItem && imageItem.state !== 'processing';
    }

    getProcessorState() {
        return {
            isReady: this.isProcessorReady,
            isProcessing: this.currentlyProcessing !== null,
            queueInfo: this.getQueueInfo()
        };
    }

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

    setStateChangeCallback(callback) {
        this.onStateChange = callback;
    }

    setQueueChangeCallback(callback) {
        this.onQueueChange = callback;
    }
}

export { ImagesProcessor };