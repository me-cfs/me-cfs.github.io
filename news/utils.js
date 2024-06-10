function getCurrentTimestamp() {
    const options = { timeZone: 'Europe/London', timeZoneName: 'short' };
    return new Date().toLocaleString('en-GB', options);
}

function extractBaseUrl(googleRedirectUrl) {
    const timestamp = getCurrentTimestamp();
    console.log(`[${timestamp}] Extracting base URL from: ${googleRedirectUrl}`);
    try {
        const url = new URL(googleRedirectUrl);
        const targetUrl = url.searchParams.get('url');
        if (!targetUrl) {
            throw new Error("Target URL not found in Google redirect URL.");
        }
        const targetUrlObj = new URL(targetUrl);
        const baseUrl = targetUrlObj.hostname.replace('www.', '');
        console.log(`[${timestamp}] Base URL extracted: ${baseUrl}`);
        return baseUrl;
    } catch (error) {
        console.error(`[${timestamp}] Error extracting base URL from: ${googleRedirectUrl}`, error);
        return "Unknown Source";
    }
}

function decodeHtmlEntities(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    // Add suffix to day
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    return formattedDate.replace(/\d+/, day + suffix);
}

function stripHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
}

export { getCurrentTimestamp, extractBaseUrl, decodeHtmlEntities, formatDate, stripHtmlTags };