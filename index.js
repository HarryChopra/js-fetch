function renderBooks(books) {
    const main = document.querySelector('main');
    books.forEach(book => {
        const h2 = document.createElement('h2');
        h2.textContent = book.name;
        main.appendChild(h2);
    });
}

async function apiCall(url) {
    const fetchResult = await fetch(url);
    const result = await fetchResult.json();

    if (fetchResult.ok && fetchResult.status === 200) {
        return result;
    }

    const responseError = {
        type: 'Error',
        message: result.message || 'Something went wrong',
        data: result.data || '',
        code: result.code || ''
    };

    let error = new Error();
    error = { ...error, ...responseError };
    throw error;
}

async function fetchBooks() {
    try {
        const books = await apiCall('https://anapioficeandfire.com/api/books');
        renderBooks(books);
    } catch (err) {
        console.debug('Failed fetching books', err);
    }
}

document.addEventListener('DOMContentLoaded', fetchBooks);
