// UI Event Handlers

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

    shareButton.innerHTML = '<span class="btn-text">Compartilhando... <i class="fa-regular fa-clock"></i></span>';

    const shareData = {
        title: 'Uma Nova Forma de Remover Background de Imagens! — I Hate Background',
        text: 'Remova o fundo de imagens grátis, rápido e seguro. Sem uploads! Tudo no navegador, 100% privado. Experimente agora!',
        url: 'https://ihatebackground.com'
    };

    try {
        await navigator.share(shareData);
        shareButton.innerHTML = '<span class="btn-text">Compartilhado com sucesso! <i class="fa-solid fa-check"></i></span>';
        setTimeout(() => {
            shareButton.innerHTML = '<span class="btn-text">Compartilhar o site <i class="fa-solid fa-share-nodes"></i></span>';
        }, 2000);
        if (window.gtag_report_shared_action_conversion) {
            gtag_report_shared_action_conversion(undefined);
        }
    } catch (error) {
        try {
            await navigator.clipboard.writeText(shareData.url);
            shareButton.innerHTML = '<span class="btn-text">Link copiado para a área de transferência! <i class="fa-solid fa-check"></i></span>';
            setTimeout(() => {
                shareButton.innerHTML = '<span class="btn-text">Compartilhar o site <i class="fa-solid fa-share-nodes"></i></span>';
            }, 2000);
            if (window.gtag_report_shared_action_conversion) {
                gtag_report_shared_action_conversion(undefined);
            }
        } catch (clipboardError) {
            shareButton.innerHTML = '<span class="btn-text">Erro ao compartilhar! <i class="fa-regular fa-xmark"></i></span>';
            setTimeout(() => {
                shareButton.innerHTML = '<span class="btn-text">Compartilhar o site <i class="fa-solid fa-share-nodes"></i></span>';
            }, 2000);
        }
    }
}

// Text constants for image processing
window.SAVE_IMAGE_TEXT = 'Salvar';
window.ADDED_TO_QUEUE_IMAGE_TEXT = 'Adicionado à fila ⏳';
window.PROCESSING_IMAGE_TEXT = 'Pensando 🔄';
window.READY_IMAGE_TEXT = 'Imagem pronta ✅';
