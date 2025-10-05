// UI Event Handlers - English version

// Footer year setup
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Share button handler
    const shareButton = document.querySelector('#share');
    if (shareButton) {
        shareButton.addEventListener('click', handleShare);
    }

    // Scroll to incentives button
    const donationButtons = document.querySelectorAll('[data-scroll-to="incentives-me"]');
    donationButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('#incentives-me')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start', 
                inline: 'center' 
            });
        });
    });

    // API button handler
    const apiButton = document.querySelector('[data-action="open-api"]');
    if (apiButton) {
        apiButton.addEventListener('click', () => {
            window.open('https://rapidapi.com/LuSrodri/api/i-hate-background-api', '_blank');
            if (window.gtag_report_donation_started_conversion) {
                gtag_report_donation_started_conversion(undefined);
            }
        });
    }

    // Scroll to drop-zone buttons
    const scrollToDropZoneButtons = document.querySelectorAll('[data-scroll-to="drop-zone"]');
    scrollToDropZoneButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('#drop-zone')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center', 
                inline: 'center' 
            });
        });
    });

    // BMC donation button
    const bmcButton = document.querySelector('[data-action="open-bmc"]');
    if (bmcButton) {
        bmcButton.addEventListener('click', () => {
            window.open('https://buymeacoffee.com/lusrodri', '_blank');
            if (window.gtag_report_donation_started_conversion) {
                gtag_report_donation_started_conversion(undefined);
            }
        });
    }

    // GitHub button
    const githubButton = document.querySelector('[data-action="open-github"]');
    if (githubButton) {
        githubButton.addEventListener('click', () => {
            window.open('https://github.com/lusrodri/canva-copy', '_blank');
        });
    }
});

// Share button handler
async function handleShare() {
    const shareButton = document.querySelector('#share');
    if (!shareButton) return;

    shareButton.innerHTML = '<span class="btn-text">Sharing... <i class="fa-regular fa-clock"></i></span>';

    const shareData = {
        title: 'A New Way to Remove Image Backgrounds! — I Hate Background',
        text: 'Remove image backgrounds for free, fast and secure. No uploads! Everything in the browser, 100% private. Try it now!',
        url: 'https://ihatebackground.com/en.html'
    };

    try {
        await navigator.share(shareData);
        shareButton.innerHTML = '<span class="btn-text">Shared successfully! <i class="fa-solid fa-check"></i></span>';
        setTimeout(() => {
            shareButton.innerHTML = '<span class="btn-text">Share the site <i class="fa-solid fa-share-nodes"></i></span>';
        }, 2000);
        if (window.gtag_report_shared_action_conversion) {
            gtag_report_shared_action_conversion(undefined);
        }
    } catch (error) {
        try {
            await navigator.clipboard.writeText(shareData.url);
            shareButton.innerHTML = '<span class="btn-text">Link copied to clipboard! <i class="fa-solid fa-check"></i></span>';
            setTimeout(() => {
                shareButton.innerHTML = '<span class="btn-text">Share the site <i class="fa-solid fa-share-nodes"></i></span>';
            }, 2000);
            if (window.gtag_report_shared_action_conversion) {
                gtag_report_shared_action_conversion(undefined);
            }
        } catch (clipboardError) {
            shareButton.innerHTML = '<span class="btn-text">Error sharing! <i class="fa-regular fa-xmark"></i></span>';
            setTimeout(() => {
                shareButton.innerHTML = '<span class="btn-text">Share the site <i class="fa-solid fa-share-nodes"></i></span>';
            }, 2000);
        }
    }
}

// Text constants for image processing (English)
window.SAVE_IMAGE_TEXT = 'Save';
window.ADDED_TO_QUEUE_IMAGE_TEXT = 'Added to queue ⏳';
window.PROCESSING_IMAGE_TEXT = 'Thinking 🔄';
window.READY_IMAGE_TEXT = 'Image ready ✅';
