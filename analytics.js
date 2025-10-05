// Google Analytics Configuration
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-XQFNE3CH9D');

// Event snippet for imagem processada com sucesso conversion page
function gtag_report_conversion(url) {
    const callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    };

    gtag('event', 'conversion', {
        'send_to': 'AW-10837733837/ZxxLCL7U2OQaEM3j6q8o',
        'event_callback': callback
    });

    gtag('event', 'background_removed', {
        'send_to': 'G-XQFNE3CH9D',
        'value': 1.0
    });

    return false;
}

// Event snippet for compartilhamento iniciado conversion page
function gtag_report_shared_action_conversion(url) {
    const callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    };

    gtag('event', 'conversion', {
        'send_to': 'AW-10837733837/OeNiCIijxvcaEM3j6q8o',
        'event_callback': callback
    });

    gtag('event', 'shared_action', {
        'send_to': 'G-XQFNE3CH9D',
        'value': 2.0
    });

    return false;
}

// Event snippet for doação iniciada conversion page
function gtag_report_donation_started_conversion(url) {
    const callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    };

    gtag('event', 'conversion', {
        'send_to': 'AW-10837733837/v1JGCIujxvcaEM3j6q8o',
        'event_callback': callback
    });

    gtag('event', 'donation_started', {
        'send_to': 'G-XQFNE3CH9D',
        'value': 3.0
    });

    return false;
}

// Event snippet for anúncio clicado conversion page
function gtag_report_ads_clicked_conversion(url) {
    const callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    };

    gtag('event', 'conversion', {
        'send_to': 'AW-10837733837/83rNCKSkxvcaEM3j6q8o',
        'event_callback': callback
    });

    gtag('event', 'ads_clicked', {
        'send_to': 'G-XQFNE3CH9D',
        'value': 4.0
    });

    return false;
}

// Make functions globally available
window.gtag_report_conversion = gtag_report_conversion;
window.gtag_report_shared_action_conversion = gtag_report_shared_action_conversion;
window.gtag_report_donation_started_conversion = gtag_report_donation_started_conversion;
window.gtag_report_ads_clicked_conversion = gtag_report_ads_clicked_conversion;
