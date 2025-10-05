import { webpToPng } from './utils.js';
import { ImagesProcessor } from './ImagesProcessor.js';

const dropZone = document.getElementById('drop-zone');
const addFilesButton = document.getElementById('add-files');
const fileInput = document.getElementById('file-input');
const divImages = document.getElementById('images');
const imagesExamples = document.querySelectorAll('img.example-image');

const imagesProcessor = new ImagesProcessor();
const imageElements = new Map();

imagesProcessor.setStateChangeCallback(handleStateChange);
imagesProcessor.setQueueChangeCallback(handleQueueChange);

// Habilitar interface imediatamente
enableInterface();

function handleStateChange(eventType, data) {
    switch (eventType) {
        case 'processor-ready':
            // Modelo pronto - interface já estava habilitada
            console.log('AI model ready for processing');
            break;
            
        case 'processor-error':
            alert(`Error: ${data.error}`);
            break;
            
        case 'image-added':
            showImage(data.imageItem);
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

function handleQueueChange(queueInfo) {
    updateQtyImages(queueInfo.totalImages);
}

function enableInterface() {
    addFilesButton.addEventListener('click', () => {
        fileInput.click();
    });

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

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length) {
            handleFiles(files);
            e.target.value = '';
        }
    });

    imagesExamples.forEach((image) => {
        image.addEventListener('click', () => {
            const partialUrl = image.getAttribute('data-url');
            if (partialUrl) {
                imagesProcessor.addExampleImage(partialUrl);
            } else {
                console.error('URL not found for the example image:', partialUrl);
            }
        });
    });

    document.addEventListener('paste', async (event) => {
        const items = event.clipboardData.items;
        const images = Array.from(items).filter(item => item.type.startsWith('image/'));
        const files = images.map(item => item.getAsFile()).filter(file => file);
        if (files.length) {
            handleFiles(files);
        }
    });
}

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

        const infoview = document.createElement('p');
        infoview.classList.add('infoview');
        updateInfoViewText(infoview, imageItem.state);
        divShowImage.appendChild(infoview);

        divImage.appendChild(divShowImage);

        const divButtons = document.createElement('div');
        divButtons.classList.add('buttons');

        const buttonToDelete = document.createElement('button');
        buttonToDelete.classList.add('btn', 'remove-file', 'small', 'red');
        buttonToDelete.innerHTML = '<span class="btn-icon" aria-hidden="true"><i class="fa-solid fa-ban"></i></span>';
        buttonToDelete.setAttribute('aria-label', 'Remove image');
        buttonToDelete.addEventListener('click', () => {
            if (imagesProcessor.canRemoveImage(imageItem.id)) {
                imagesProcessor.removeImage(imageItem.id);
            }
        });

        divButtons.appendChild(buttonToDelete);
        divImage.appendChild(divButtons);

        divImages.appendChild(divImage);

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

function updateImageUI(imageId, state, processedResult = null) {
    const elements = imageElements.get(imageId);
    if (!elements) {
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

    elements.image = newImg;
}

function addDownloadButton(imageId, result) {
    const elements = imageElements.get(imageId);
    if (!elements) return;

    const imageItem = imagesProcessor.getImage(imageId);
    if (!imageItem) return;

    const existingDownloadButton = elements.buttons.querySelector('.download-file');
    if (existingDownloadButton) {
        existingDownloadButton.remove();
    }

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('btn', 'download-file', 'small');
    const saveText = typeof SAVE_IMAGE_TEXT !== 'undefined' ? SAVE_IMAGE_TEXT : 'Save';
    downloadButton.innerHTML = `<span class="btn-text">${saveText}</span><span class="btn-icon" aria-hidden="true"><i class="fa-regular fa-floppy-disk"></i></span>`;
    downloadButton.setAttribute('aria-label', `Download processed image`);

    downloadButton.addEventListener('click', () => {
        downloadImage(result, imageItem.originalName);
    });

    elements.buttons.insertBefore(downloadButton, elements.buttons.firstChild);
}

function removeImageElement(imageId) {
    const elements = imageElements.get(imageId);
    if (elements && elements.container) {
        elements.container.remove();
        imageElements.delete(imageId);
    }
}

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

function scrollToImages() {
    setTimeout(() => {
        divImages.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 100);
}

function showShareSection() {
    document.querySelector('#share-action').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('#share-action').classList.remove('invisible');
        document.querySelector('.images-container').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 250);
}

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
    
    const fileName = originalName.includes('.') 
        ? originalName.replace(/\.(jpg|jpeg|webp|png)$/i, '-without-background.png')
        : 'image-without-background.png';
    
    a.download = fileName;
    a.click();
}

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

function updateQtyImages(qtd) {
    if (qtd <= 0) {
        document.querySelector('#share-action').classList.add('hidden', 'invisible');
    }
}