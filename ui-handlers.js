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

    shareButton.innerHTML = '<span class="btn-text">Compartilhando...</span><span class="btn-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg></span>';

    const shareData = {
        title: 'Uma Nova Forma de Remover Background de Imagens! — I Hate Background',
        text: 'Remova o fundo de imagens grátis, rápido e seguro. Sem uploads! Tudo no navegador, 100% privado. Experimente agora!',
        url: 'https://ihatebackground.com'
    };

    try {
        await navigator.share(shareData);
        shareButton.innerHTML = '<span class="btn-text">Compartilhado com sucesso!</span><span class="btn-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg></span>';
        setTimeout(() => {
            shareButton.innerHTML = '<span class="btn-text">Compartilhar o site</span><span class="btn-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M371.8 82.4C359.8 87.4 352 99 352 112L352 192L240 192C142.8 192 64 270.8 64 368C64 481.3 145.5 531.9 164.2 542.1C166.7 543.5 169.5 544 172.3 544C183.2 544 192 535.1 192 524.3C192 516.8 187.7 509.9 182.2 504.8C172.8 496 160 478.4 160 448.1C160 395.1 203 352.1 256 352.1L352 352.1L352 432.1C352 445 359.8 456.7 371.8 461.7C383.8 466.7 397.5 463.9 406.7 454.8L566.7 294.8C579.2 282.3 579.2 262 566.7 249.5L406.7 89.5C397.5 80.3 383.8 77.6 371.8 82.6z"/></svg></span>';
        }, 2000);
        if (window.gtag_report_shared_action_conversion) {
            gtag_report_shared_action_conversion(undefined);
        }
    } catch (error) {
        try {
            await navigator.clipboard.writeText(shareData.url);
            shareButton.innerHTML = '<span class="btn-text">Link copiado para a área de transferência!</span><span class="btn-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg></span>';
            setTimeout(() => {
                shareButton.innerHTML = '<span class="btn-text">Compartilhar o site</span><span class="btn-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M371.8 82.4C359.8 87.4 352 99 352 112L352 192L240 192C142.8 192 64 270.8 64 368C64 481.3 145.5 531.9 164.2 542.1C166.7 543.5 169.5 544 172.3 544C183.2 544 192 535.1 192 524.3C192 516.8 187.7 509.9 182.2 504.8C172.8 496 160 478.4 160 448.1C160 395.1 203 352.1 256 352.1L352 352.1L352 432.1C352 445 359.8 456.7 371.8 461.7C383.8 466.7 397.5 463.9 406.7 454.8L566.7 294.8C579.2 282.3 579.2 262 566.7 249.5L406.7 89.5C397.5 80.3 383.8 77.6 371.8 82.6z"/></svg></span>';
            }, 2000);
            if (window.gtag_report_shared_action_conversion) {
                gtag_report_shared_action_conversion(undefined);
            }
        } catch (clipboardError) {
            shareButton.innerHTML = '<span class="btn-text">Erro ao compartilhar!</span><span class="btn-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg></span>';
            setTimeout(() => {
                shareButton.innerHTML = '<span class="btn-text">Compartilhar o site</span><span class="btn-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M371.8 82.4C359.8 87.4 352 99 352 112L352 192L240 192C142.8 192 64 270.8 64 368C64 481.3 145.5 531.9 164.2 542.1C166.7 543.5 169.5 544 172.3 544C183.2 544 192 535.1 192 524.3C192 516.8 187.7 509.9 182.2 504.8C172.8 496 160 478.4 160 448.1C160 395.1 203 352.1 256 352.1L352 352.1L352 432.1C352 445 359.8 456.7 371.8 461.7C383.8 466.7 397.5 463.9 406.7 454.8L566.7 294.8C579.2 282.3 579.2 262 566.7 249.5L406.7 89.5C397.5 80.3 383.8 77.6 371.8 82.6z"/></svg></span>';
            }, 2000);
        }
    }
}

// Text constants for image processing
window.SAVE_IMAGE_TEXT = 'Salvar';
window.ADDED_TO_QUEUE_IMAGE_TEXT = 'Adicionado à fila ⏳';
window.PROCESSING_IMAGE_TEXT = 'Pensando 🔄';
window.READY_IMAGE_TEXT = 'Imagem pronta ✅';
