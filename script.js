import { webpToPng } from './utils.js';
import { ImagesProcessor } from './ImagesProcessor.js';

const dropZone = document.getElementById('drop-zone');
const addFilesButton = document.getElementById('add-files');
const fileInput = document.getElementById('file-input');
const divImages = document.getElementById('images');
const imagesExamples = document.querySelectorAll('img.example-image');

// Inicializa o processador de imagens
const imagesProcessor = new ImagesProcessor();

// Map para rastrear elementos DOM por ID de imagem
const imageElements = new Map();

// Configura os callbacks do processador
imagesProcessor.setStateChangeCallback(handleStateChange);
imagesProcessor.setQueueChangeCallback(handleQueueChange);

/**
 * Manipula mudanças de estado do processador
 */
function handleStateChange(eventType, data) {
    switch (eventType) {
        case 'processor-ready':
            enableInterface();
            break;
            
        case 'processor-error':
            alert(`Error: ${data.error}`);
            break;
            
        case 'image-added':
            showImage(data.imageItem);
            // Faz scroll para as imagens quando uma nova é adicionada
            scrollToImages();
            break;
            
        case 'processing-started':
            updateImageUI(data.imageItem.id, 'processing');
            scrollToImages();
            break;
            
        case 'processing-completed':
            updateImageUI(data.imageItem.id, 'ready', data.imageItem.processedResult);
            gtag_report_conversion(undefined);
            showShareSection();
            break;
            
        case 'processing-error':
            updateImageUI(data.imageItem.id, 'error');
            alert(`Error processing image: ${data.error.message}`);
            break;
            
        case 'image-removed':
            removeImageElement(data.id);
            break;
            
        case 'error':
            alert(`Error: ${data.error}`);
            break;
    }
}

/**
 * Manipula mudanças na fila de processamento
 */
function handleQueueChange(queueInfo) {
    updateQtyImages(queueInfo.totalImages);
}

/**
 * Habilita a interface quando o processador estiver pronto
 */
function enableInterface() {
    // Habilita o botão de adicionar arquivos
    addFilesButton.addEventListener('click', () => {
        fileInput.click();
    });
    addFilesButton.disabled = false;

    // Configura drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (e) => {
        if (!dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('dragover');
        }
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    });

    dropZone.removeAttribute('aria-disabled');

    // Configura input de arquivo
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length) {
            handleFiles(files);
            e.target.value = '';
        }
    });
    fileInput.disabled = false;

    // Configura imagens de exemplo
    imagesExamples.forEach((image) => {
        image.addEventListener('click', () => {
            const partialUrl = image.getAttribute('data-url');
            if (partialUrl) {
                imagesProcessor.addExampleImage(partialUrl);
            } else {
                console.error('URL not found for the example image:', partialUrl);
            }
        });

        image.removeAttribute('aria-disabled');
    });

    // Configura cola de imagens
    document.addEventListener('paste', async (event) => {
        const items = event.clipboardData.items;
        const images = Array.from(items).filter(item => item.type.startsWith('image/'));
        const files = images.map(item => item.getAsFile()).filter(file => file);
        if (files.length) {
            handleFiles(files);
        }
    });
}

/**
 * Processa arquivos selecionados pelo usuário
 */
async function handleFiles(files) {
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/png'];

    for (let file of files) {
        if (allowedTypes.includes(file.type)) {
            if (file.type === 'image/webp') {
                file = await webpToPng(file);
            }
            imagesProcessor.addImage(file);
        } else {
            alert(`File type not supported: ${file.type}. Please upload a WEBP, JPEG or PNG image.`);
        }
    }
}

/**
 * Mostra uma nova imagem na interface
 */
function showImage(imageItem) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const divImage = document.createElement('div');
        divImage.classList.add('image', 'glass');
        divImage.dataset.imageId = imageItem.id;

        const img = document.createElement('img');
        img.src = e.target.result;

        const divShowImage = document.createElement('div');
        divShowImage.classList.add('show-image');
        divShowImage.appendChild(img);

        const infoview = document.createElement('h3');
        infoview.classList.add('infoview');
        updateInfoViewText(infoview, imageItem.state);
        divShowImage.appendChild(infoview);

        divImage.appendChild(divShowImage);

        const divButtons = document.createElement('div');
        divButtons.classList.add('buttons');

        const buttonToDelete = document.createElement('button');
        buttonToDelete.classList.add('btn', 'remove-file', 'small', 'red');
        buttonToDelete.innerHTML = '<h3><i class="fa-solid fa-ban"></i></h3>';
        buttonToDelete.addEventListener('click', () => {
            if (imagesProcessor.canRemoveImage(imageItem.id)) {
                imagesProcessor.removeImage(imageItem.id);
            }
        });

        divButtons.appendChild(buttonToDelete);
        divImage.appendChild(divButtons);

        divImages.appendChild(divImage);

        // Armazena a referência do elemento
        imageElements.set(imageItem.id, {
            container: divImage,
            image: img,
            infoview: infoview,
            buttons: divButtons,
            deleteButton: buttonToDelete
        });
    };
    reader.readAsDataURL(imageItem.file);
}

/**
 * Atualiza a interface de uma imagem específica
 */
function updateImageUI(imageId, state, processedResult = null) {
    const elements = imageElements.get(imageId);
    if (!elements) {
        // Se o elemento ainda não estiver renderizado, tenta novamente em 10ms
        setTimeout(() => updateImageUI(imageId, state, processedResult), 10);
        return;
    }

    const { container, image, infoview, buttons, deleteButton } = elements;

    switch (state) {
        case 'processing':
            const showImage = container.querySelector('.show-image');
            if (showImage) {
                showImage.classList.add('loading');
            }
            image.classList.add('loading');
            infoview.classList.add('loading');
            updateInfoViewText(infoview, 'processing');
            deleteButton.disabled = true;
            deleteButton.style.opacity = '0.5';
            deleteButton.style.cursor = 'not-allowed';
            break;

        case 'ready':
            if (processedResult) {
                displayProcessedImage(imageId, processedResult);
            }
            const showImageReady = container.querySelector('.show-image');
            if (showImageReady) {
                showImageReady.classList.remove('loading');
            }
            image.classList.remove('loading');
            infoview.classList.remove('loading');
            updateInfoViewText(infoview, 'ready');
            deleteButton.disabled = false;
            deleteButton.style.opacity = '1';
            deleteButton.style.cursor = 'pointer';
            addDownloadButton(imageId, processedResult);
            break;

        case 'error':
            const showImageError = container.querySelector('.show-image');
            if (showImageError) {
                showImageError.classList.remove('loading');
            }
            image.classList.remove('loading');
            infoview.classList.remove('loading');
            updateInfoViewText(infoview, 'error');
            deleteButton.disabled = false;
            deleteButton.style.opacity = '1';
            deleteButton.style.cursor = 'pointer';
            break;
    }
}

/**
 * Exibe a imagem processada
 */
function displayProcessedImage(imageId, result) {
    const elements = imageElements.get(imageId);
    if (!elements) return;

    const imageData = result[0].data;
    const imageWidth = result[0].width;
    const imageHeight = result[0].height;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    let imageDataObj = new ImageData(imageData, imageWidth, imageHeight);
    imageDataObj = normalizeAlphaPixels(imageDataObj);

    ctx.putImageData(imageDataObj, 0, 0);

    const imgURL = canvas.toDataURL('image/png');

    const newImg = document.createElement('img');
    newImg.src = imgURL;

    const parent = elements.image.parentNode;
    parent.appendChild(newImg);
    parent.removeChild(elements.image);

    // Atualiza a referência da imagem
    elements.image = newImg;
}

/**
 * Adiciona botão de download para imagem processada
 */
function addDownloadButton(imageId, result) {
    const elements = imageElements.get(imageId);
    if (!elements) return;

    const imageItem = imagesProcessor.getImage(imageId);
    if (!imageItem) return;

    // Remove botão de download existente se houver
    const existingDownloadButton = elements.buttons.querySelector('.download-file');
    if (existingDownloadButton) {
        existingDownloadButton.remove();
    }

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('btn', 'download-file', 'small');
    const saveText = typeof SAVE_IMAGE_TEXT !== 'undefined' ? SAVE_IMAGE_TEXT : 'Save';
    downloadButton.innerHTML = `<h3><i class="fa-regular fa-floppy-disk"></i> ${saveText}</h3>`;

    downloadButton.addEventListener('click', () => {
        downloadImage(result, imageItem.originalName);
    });

    elements.buttons.insertBefore(downloadButton, elements.buttons.firstChild);
}

/**
 * Remove elemento da imagem da interface
 */
function removeImageElement(imageId) {
    const elements = imageElements.get(imageId);
    if (elements && elements.container) {
        elements.container.remove();
        imageElements.delete(imageId);
    }
}

/**
 * Atualiza o texto do status da imagem
 */
function updateInfoViewText(infoview, state) {
    switch (state) {
        case 'queued':
            const queuedText = typeof ADDED_TO_QUEUE_IMAGE_TEXT !== 'undefined' 
                ? ADDED_TO_QUEUE_IMAGE_TEXT
                : 'Queued for processing ⏳';
            infoview.textContent = queuedText;
            break;
        case 'processing':
            const processingText = typeof PROCESSING_IMAGE_TEXT !== 'undefined' 
                ? PROCESSING_IMAGE_TEXT 
                : 'Processing image 🔄';
            infoview.textContent = processingText;
            break;
        case 'ready':
            const readyText = typeof READY_IMAGE_TEXT !== 'undefined' 
                ? READY_IMAGE_TEXT 
                : 'Ready image ✅';
            infoview.textContent = readyText;
            break;
        case 'error':
            infoview.textContent = 'Error ❌';
            break;
    }
}

/**
 * Faz scroll para a área das imagens
 */
function scrollToImages() {
    setTimeout(() => {
        divImages.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 100);
}

/**
 * Mostra a seção de compartilhamento
 */
function showShareSection() {
    document.querySelector('#share-action').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('#share-action').classList.remove('invisible');
        document.querySelector('.images-container').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 250);
}

/**
 * Faz download da imagem processada
 */
function downloadImage(result, originalName = 'image-without-background.png') {
    const imageData = result[0].data;
    const imageWidth = result[0].width;
    const imageHeight = result[0].height;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    let imageDataObj = new ImageData(imageData, imageWidth, imageHeight);
    imageDataObj = normalizeAlphaPixels(imageDataObj);

    ctx.putImageData(imageDataObj, 0, 0);

    const imgURL = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.href = imgURL;
    
    // Usa o nome original se disponível, senão usa o padrão
    const fileName = originalName.includes('.') 
        ? originalName.replace(/\.(jpg|jpeg|webp|png)$/i, '-without-background.png')
        : 'image-without-background.png';
    
    a.download = fileName;
    a.click();
}

/**
 * Normaliza os pixels alpha da imagem
 */
function normalizeAlphaPixels(imageData) {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let alpha = data[i + 3];
        let v = (alpha - 127) * 255 / 59;
        v = Math.round(v);
        data[i + 3] = Math.max(0, Math.min(255, v));
    }

    return imageData;
}

/**
 * Atualiza a quantidade de imagens na interface
 */
function updateQtyImages(qtd) {
    if (qtd <= 0) {
        document.querySelector('#share-action').classList.add('hidden', 'invisible');
    }
}