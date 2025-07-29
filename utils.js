/**
 * Converts a WEBP File/Blob to PNG format
 * @param {File|Blob} webpFile - The WEBP file to convert
 * @returns {Promise<File>} - A promise that resolves with the converted PNG file
 */
function webpToPng(webpFile) {
    return new Promise((resolve, reject) => {
        // Create an image element to load the WEBP
        const img = new Image();
        
        // Create URL from the file
        const url = URL.createObjectURL(webpFile);
        
        img.onload = () => {
            // Create canvas to draw the image
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            // Draw image on canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // Convert canvas to blob
            canvas.toBlob((blob) => {
                // Clean up
                URL.revokeObjectURL(url);
                
                // Create new file from blob
                const convertedFile = new File([blob], 
                    webpFile.name.replace(/\.webp$/, '.png'),
                    { type: 'image/png' }
                );
                
                resolve(convertedFile);
            }, 'image/png');
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load WEBP image'));
        };
        
        // Set source to start loading
        img.src = url;
    });
}

export { webpToPng };