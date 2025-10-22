import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6';

let segmenter = undefined;

try {
    segmenter = await pipeline('background-removal', 'onnx-community/ormbg-ONNX');
    postMessage({
        success: 'Background removal model loaded successfully using CPU.'
    });
}
catch (e) {
    postMessage({
        error: `Failed to load the background removal model. Please check your internet connection or try again later. ${e.message}.`
    });
}

async function removeBackground(file) {
    const fileURL = URL.createObjectURL(file);
    const result = await segmenter(fileURL);

    return result;
}

onmessage = async (event) => {
    const { id, file } = event.data;

    try {
        const result = await removeBackground(file);
        postMessage({ id, result });
    } catch (e) {
        postMessage({ id, error: 'Failed to remove background: ' + e.message });
    }
};