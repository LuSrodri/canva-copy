import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers';


const dropZone = document.getElementById('drop-zone');
const addFilesButton = document.getElementById('add-files');
const fileInput = document.getElementById('file-input');
const filesToRemoveBackground = [];
const divImages = document.getElementById('images');
const showQtdImages = document.getElementById('show-qtd-images');
showQtdImages.addEventListener('click', removeBackgrounds);
const qtdImages = document.getElementById('qtd-images');

const segmenter = await pipeline('background-removal', 'briaai/RMBG-1.4');



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

function handleFiles(files) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = files[0];

    if (allowedTypes.includes(file.type)) {
        filesToRemoveBackground.push(file);
        showQtdImages.style.display = 'flex';
        qtdImages.textContent = filesToRemoveBackground.length;
        showImage(file);
    } else {
        alert("Tipo de arquivo não permitido. Escolha JPG ou PNG.");
    }
}

function showImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const divImage = document.createElement('div');
        divImage.classList.add('image');

        const img = document.createElement('img');
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
        buttonToDelete.textContent = 'Desistir';
        buttonToDelete.addEventListener('click', () => {
            removeImageFromArray(file);
            divImage.remove();
            img.remove();
        });

        divButtons.appendChild(buttonToDelete);

        divImage.appendChild(divButtons);

        divImages.appendChild(divImage);
    };
    reader.readAsDataURL(file);
}

function removeImageFromArray(file) {
    const index = filesToRemoveBackground.indexOf(file);
    if (index > -1) {
        filesToRemoveBackground.splice(index, 1);
    }
    qtdImages.textContent = filesToRemoveBackground.length;
}

async function removeBackgrounds() {
    // Display none all imgs
    const imagesDiv = document.querySelectorAll('.image');
    const images = document.querySelectorAll('.image img');
    images.forEach(img => {
        img.style.display = 'none';
    });

    // Disable all delete buttons
    const buttons = document.querySelectorAll('.remove-file');
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Do remove background
    const promises = filesToRemoveBackground.map(file => removeBackground(file));

    const results = await Promise.all(promises);

    // Show results
    results.forEach((result, index) => {
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

        const parent = images[index].parentNode;
        parent.appendChild(img);
        parent.removeChild(images[index]);

        img.style.display = 'block';
    });

    // Enable all delete buttons
    buttons.forEach(button => {
        button.disabled = false;
    });

    // Adds download button
    const downloadButton = document.createElement('button');
    downloadButton.classList.add('btn');
    downloadButton.classList.add('download-file');
    downloadButton.textContent = 'Download';
    results.forEach((result, index) => {
        downloadButton.addEventListener('click', () => {
            downloadImage(result, index);
        });
        imagesDiv[index].querySelector('.buttons').appendChild(downloadButton);
    });
}

function removeBackground(file) {
    return new Promise(async (resolve, reject) => {
        const fileURL = URL.createObjectURL(file);
        const output = await segmenter(fileURL);
        resolve(output);
    });
}

function downloadImage(result, index) {
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
    a.download = `image-${index}.png`;
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
