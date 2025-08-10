/**
 * Converts a WEBP File/Blob to PNG format
 * @param {File|Blob} webpFile - The WEBP file to convert
 * @returns {Promise<File>} - A promise that resolves with the converted PNG file
 */
function webpToPng(webpFile) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(webpFile);
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(url);
                
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
        
        img.src = url;
    });
}

export { webpToPng };