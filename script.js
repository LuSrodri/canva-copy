import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0';


const dropZone = document.getElementById('drop-zone');
const addFilesButton = document.getElementById('add-files');
const fileInput = document.getElementById('file-input');
const filesToRemoveBackground = [];
const divImages = document.getElementById('images');
const showQtdImages = document.getElementById('show-qtd-images');
const qtdImages = document.getElementById('qtd-images');

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
        console.log("Arquivos válidos:", filesToRemoveBackground);
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
    console.log("Arquivos válidos:", filesToRemoveBackground);
    qtdImages.textContent = filesToRemoveBackground.length;
}

// const segmenter = await pipeline('background-removal', 'Xenova/modnet');
// const url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/portrait-of-woman_small.jpg';
// const output = await segmenter(url);

// console.log(output);
