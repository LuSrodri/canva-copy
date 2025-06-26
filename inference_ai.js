import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0';

let segmenter = undefined;

try {
    segmenter = await pipeline('background-removal', 'briaai/RMBG-1.4', { dtype: 'fp32' });
    postMessage({
        success: 'Background removal model loaded successfully using CPU.'
    });
}
catch (e) {
    postMessage({
        error: `Failed to load the background removal model. Please check your internet connection or try again later. ${error.message}. ${e.message}.`
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