
const dropZone = document.getElementById('drop-zone');
const addFilesButton = document.getElementById('add-files');
const fileInput = document.getElementById('file-input');
const filesToRemoveBackground = [];
const divImages = document.getElementById('images');
const imagesExamples = document.querySelectorAll('img.example-image');

const inferenceAiWorker = new Worker('./inference_ai.js', { type: 'module' });

inferenceAiWorker.onmessage = (event) => {
    const { id, result, error, success } = event.data;

    if (success) {
        addFilesButton.addEventListener('click', () => {
            fileInput.click();
        });

        addFilesButton.disabled = false;

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

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length) {
                handleFiles(files);
                e.target.value = '';
            }
        });

        fileInput.disabled = false;

        imagesExamples.forEach((image) => {
            image.addEventListener('click', () => {
                const partialUrl = image.getAttribute('data-url');
                const url = new URL(partialUrl, window.location.origin).toString();
                if (url) {
                    handleFilesByUrl(url);
                } else {
                    console.error('URL not found for the example image:', partialUrl);
                }
            });

            image.removeAttribute('aria-disabled');
        });

        return
    }

    if (!id) {
        if (error) alert(`Error: ${error}`);
        return;
    }

    const { resolve, reject } = pendingRequests.get(id);
    pendingRequests.delete(id);

    if (error) {
        alert(`Error: ${error}`);
        reject(new Error(error));
    } else {
        resolve(result);
    }
};

const pendingRequests = new Map();
let nextRequestId = 1;

function handleFilesByUrl(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'image-from-url.png', { type: blob.type });
            handleFiles([file]);
        })
        .catch(error => {
            console.error('Error fetching the image from URL:', error);
        });
}

function handleFiles(files) {
    const allowedTypes = ['image/jpeg', 'image/png'];

    for (let file of files) {
        if (allowedTypes.includes(file.type)) {
            filesToRemoveBackground.push(file);
            updateQtyImages(filesToRemoveBackground.length);
            showImage(file);
        } else {
            alert(`File type not supported: ${file.type}. Please upload a JPEG or PNG image.`);
        }
    }
}

function showImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const divImage = document.createElement('div');
        divImage.classList.add('image');

        const img = document.createElement('img');
        img.classList.add('loading');
        img.src = e.target.result;

        const divShowImage = document.createElement('div');
        divShowImage.classList.add('show-image');
        divShowImage.appendChild(img);

        divImage.appendChild(divShowImage);

        const divButtons = document.createElement('div');
        divButtons.classList.add('buttons');

        const buttonToDelete = document.createElement('button');
        buttonToDelete.classList.add('btn');
        buttonToDelete.classList.add('remove-file');
        buttonToDelete.textContent = '❌';
        buttonToDelete.addEventListener('click', () => {
            removeImageFromArray(file);
            divImage.remove();
            img.remove();
        });

        divButtons.appendChild(buttonToDelete);

        divImage.appendChild(divButtons);

        divImages.appendChild(divImage);

        startsRemoveBackground(img, file);
    };
    reader.readAsDataURL(file);
}

function removeImageFromArray(file) {
    const index = filesToRemoveBackground.indexOf(file);
    if (index > -1) {
        filesToRemoveBackground.splice(index, 1);
    }
    updateQtyImages(filesToRemoveBackground.length);
}

async function startsRemoveBackground(imgElement, file) {
    divImages.scrollIntoView({ behavior: 'smooth' });

    const image = imgElement;
    const imageDiv = image.parentNode.parentNode;

    removeBackground(file).then((result) => {
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

        const img = document.createElement('img');
        img.src = imgURL;

        const parent = image.parentNode;
        parent.appendChild(img);
        parent.removeChild(image);

        img.style.display = 'block';

        imageDiv.querySelector('.show-image').classList.remove('loading');

        if (imageDiv.querySelector('.download-file')) {
            imageDiv.querySelector('.download-file').remove();
        }
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('btn', 'download-file');
        downloadButton.textContent = '📥 Download';

        downloadButton.addEventListener('click', () => {
            downloadImage(result);
        });

        const buttonsDiv = imageDiv.querySelector('.buttons');
        buttonsDiv.insertBefore(downloadButton, buttonsDiv.firstChild);
    });
}

let currentPromise = Promise.resolve();

async function removeBackground(file) {
    const thisCall = async () => {
        return new Promise((resolve, reject) => {
            const id = nextRequestId++;
            pendingRequests.set(id, { resolve, reject });
            inferenceAiWorker.postMessage({ id, file });
        });
    };

    currentPromise = currentPromise.then(() => thisCall());
    return currentPromise;
}

function downloadImage(result) {
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
    a.download = `image-without-background.png`;
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
    document.querySelector('#start-now').style.display = qtd > 0 ? 'none' : 'flex';
}