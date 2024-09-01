const maxPages = 5;

function addPageToHistory(url, title) {
    let pages = JSON.parse(localStorage.getItem('visitedPages')) || [];

    pages = pages.filter(page => page.url !== url);

    pages.unshift({ url, title });

    if (pages.length > maxPages) {
        pages.pop();
    }

    localStorage.setItem('visitedPages', JSON.stringify(pages));
}

document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;
    const title = document.title;
    addPageToHistory(url, title);
});
