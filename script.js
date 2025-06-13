import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0';


const dropZone = document.getElementById('drop-zone');
const addFilesButton = document.getElementById('add-files');
const fileInput = document.getElementById('file-input');
const filesToRemoveBackground = [];
const divImages = document.getElementById('images');

let segmenter = undefined;
pipeline('background-removal', 'briaai/RMBG-1.4', { device: "webgpu" }).then((newSegmenter) => {
    segmenter = newSegmenter;
}).catch(() => {
    pipeline('background-removal', 'briaai/RMBG-1.4').then((newSegmenter) => {
        segmenter = newSegmenter;
    });
}).catch((e) => {
    alert('Erro ao carregar o modelo de remoção de fundo: ' + e + '. Tente novamente mais tarde.');
});



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

    for (let file of files) {
        if (allowedTypes.includes(file.type)) {
            filesToRemoveBackground.push(file);
            updateQtdImages(filesToRemoveBackground.length);
            showImage(file);
        } else {
            alert(`Tipo de arquivo não permitido. Escolha JPG ou PNG. Arquivo ${file.name} não foi adicionado.`);
        }
    }

    setTimeout(() => { removeBackgrounds(); }, 250);
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
    };
    reader.readAsDataURL(file);
}

function removeImageFromArray(file) {
    const index = filesToRemoveBackground.indexOf(file);
    if (index > -1) {
        filesToRemoveBackground.splice(index, 1);
    }
    updateQtdImages(filesToRemoveBackground.length);
}

async function removeBackgrounds() {
    divImages.scrollIntoView({ behavior: 'smooth' });

    const imagesDiv = document.querySelectorAll('.image');
    const images = document.querySelectorAll('.image img');

    const buttons = document.querySelectorAll('.remove-file');
    buttons.forEach(button => {
        button.disabled = true;
    });

    for (let index in filesToRemoveBackground) {
        const file = filesToRemoveBackground[index];

        const result = await removeBackground(file);
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

        imagesDiv[index].querySelector('.show-image').classList.remove('loading');

        if (imagesDiv[index].querySelector('.download-file')) {
            imagesDiv[index].querySelector('.download-file').remove();
        }
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('btn', 'download-file');
        downloadButton.textContent = '📥 Baixar';

        downloadButton.addEventListener('click', () => {
            downloadImage(result, index);
        });

        const buttonsDiv = imagesDiv[index].querySelector('.buttons');
        buttonsDiv.insertBefore(downloadButton, buttonsDiv.firstChild);

        buttons.forEach(button => {
            button.disabled = false;
        });
    }
}

function removeBackground(file) {
    return new Promise((resolve, reject) => {
        const fileURL = URL.createObjectURL(file);
        segmenter(fileURL).then((result) => {
            resolve(result);
        });
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

function updateQtdImages(qtd) {
    document.querySelector('#start-now').style.display = qtd > 0 ? 'none' : 'flex';
}