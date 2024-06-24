function getCurrentTimestamp() {
    const options = { timeZone: 'Europe/London', timeZoneName: 'short' };
    return new Date().toLocaleString('en-GB', options);
}

function getOneWeekAgoDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function extractBaseUrl(url) {
    console.log(`Extracting base URL from: ${url}`);
    try {
        const parsedUrl = new URL(url);
        let baseUrl;

        // Check if it's a Google redirect URL
        if (parsedUrl.hostname.includes('google') && parsedUrl.searchParams.get('url')) {
            const targetUrl = parsedUrl.searchParams.get('url');
            const targetUrlObj = new URL(targetUrl);
            baseUrl = targetUrlObj.hostname.replace('www.', '');
            console.log(`Base URL extracted from Google redirect: ${baseUrl}`);
        } else {
            // Handle normal URL
            baseUrl = parsedUrl.hostname.replace('www.', '');
            console.log(`Base URL extracted: ${baseUrl}`);
        }

        return baseUrl;
    } catch (error) {
        console.error(`Error extracting base URL from: ${url}`, error);
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

export {extractBaseUrl, decodeHtmlEntities, formatDate, stripHtmlTags, getOneWeekAgoDate };
