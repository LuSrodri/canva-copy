import { pipeline } from '@huggingface/transformers'

let segmenter = undefined

try {
  segmenter = await pipeline('background-removal', 'onnx-community/ormbg-ONNX')
  postMessage({
    success: 'Background removal model loaded successfully.'
  })
} catch (e) {
  postMessage({
    error: `Failed to load the background removal model: ${e.message}`
  })
}

async function removeBackground(file) {
  const fileURL = URL.createObjectURL(file)
  const result = await segmenter(fileURL)
  URL.revokeObjectURL(fileURL)
  return result
}

self.onmessage = async (event) => {
  const { id, file } = event.data

  try {
    const result = await removeBackground(file)
    postMessage({ id, result })
  } catch (e) {
    postMessage({ id, error: 'Failed to remove background: ' + e.message })
  }
}
