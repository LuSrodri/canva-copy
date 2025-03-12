import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0';


const dropZone = document.getElementById('drop-zone');
const addFilesButton = document.getElementById('add-files');
const fileInput = document.getElementById('file-input');
const filesToRemoveBackground = [];

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
    }
});

function handleFiles(files) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = files[0];

    if (allowedTypes.includes(file.type)) {
        filesToRemoveBackground.push(file);
        console.log("Arquivos válidos:", filesToRemoveBackground);
    } else {
        alert("Tipo de arquivo não permitido. Escolha JPG ou PNG.");
    }
}

const segmenter = await pipeline('background-removal', 'Xenova/modnet');
const url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/portrait-of-woman_small.jpg';
const output = await segmenter(url);

console.log(output);
