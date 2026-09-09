const axios = require('axios');
const readline = require('readline');

const basePorts = [3000, 3001];
let currentPortIndex = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = `
Library CLI:
1. Add Book
2. Add Reader
3. Get All Books
4. Get All Readers
5. Search Book
6. Search Reader
7. Delete Book
8. Delete Reader
9. Update Book
10. Update Reader
11. Exit
Choose an option: `;

function main() {
  rl.question(menu, async (option) => {
    switch (option.trim()) {
      case '1': return addBook();
      case '2': return addReader();
      case '3': return getBooks();
      case '4': return getReaders();
      case '5': return searchBook();
      case '6': return searchReader();
      case '7': return deleteBook();
      case '8': return deleteReader();
      case '9': return updateBook();
      case '10': return updateReader();
      case '11': rl.close(); break;
      default:
        console.log('Invalid choice');
        main();
    }
  });
}

async function sendRequest(path, method = 'get', data = {}) {
  const url = `http://localhost:${basePorts[currentPortIndex]}${path}`;
  try {
    if (method === 'get') return await axios.get(url, { params: data });
    if (method === 'post') return await axios.post(url, data);
    if (method === 'delete') return await axios.delete(url, { data });
    if (method === 'put') return await axios.put(url, data);
  } catch (err) {
    if (currentPortIndex === 0) {
      console.log('[!] Primary server failed. Switching to backup...');
      currentPortIndex = 1;
      return sendRequest(path, method, data);
    } else {
      console.log('[✗] Both servers failed.');
      throw err;
    }
  }
}

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function addBook() {
  const id = await ask('Book ID: ');
  const title = await ask('Title: ');
  const publicationDate = await ask('Publication Date: ');
  const author = await ask('Author: ');
  const genre = await ask('Genre: ');
  const publisher = await ask('Publisher: ');
  const language = await ask('Language: ');

  await sendRequest('/books', 'post', {
    id: Number(id), title, publicationDate, author, genre, publisher, language
  });
  console.log('Book added.');
  main();
}

async function addReader() {
  const id = await ask('Reader ID: ');
  const name = await ask('Name: ');
  const gender = await ask('Gender: ');
  const birthday = await ask('Birthday: ');
  const height = await ask('Height: ');
  const weight = await ask('Weight: ');
  const employment = await ask('Employment: ');

  await sendRequest('/readers', 'post', {
    id: Number(id), name, gender, birthday, height: Number(height), weight: Number(weight), employment
  });
  console.log('Reader added.');
  main();
}

async function getBooks() {
  const res = await sendRequest('/books');
  console.log('Books:', res.data);
  main();
}

async function getReaders() {
  const res = await sendRequest('/readers');
  console.log('Readers:', res.data);
  main();
}

async function searchBook() {
  const input = await ask('Enter book id or title to search: ');
  const res = await sendRequest('/books/search', 'get', { id: input, title: input });
  console.log('Found:', res.data);
  main();
}

async function searchReader() {
  const input = await ask('Enter reader id or name to search: ');
  const res = await sendRequest('/readers/search', 'get', { id: input, name: input });
  console.log('Found:', res.data);
  main();
}

async function deleteBook() {
  const id = await ask('Enter book id to delete: ');
  await sendRequest('/books', 'delete', { id: Number(id) });
  console.log('Book deleted.');
  main();
}

async function deleteReader() {
  const id = await ask('Enter reader id to delete: ');
  await sendRequest('/readers', 'delete', { id: Number(id) });
  console.log('Reader deleted.');
  main();
}

async function updateBook() {
  const id = await ask('Enter book id to update: ');
  const title = await ask('New Title: ');
  const publicationDate = await ask('New Publication Date: ');
  const author = await ask('New Author: ');
  const genre = await ask('New Genre: ');
  const publisher = await ask('New Publisher: ');
  const language = await ask('New Language: ');

  await sendRequest('/books', 'put', {
    id: Number(id), title, publicationDate, author, genre, publisher, language
  });
  console.log('Book updated.');
  main();
}

async function updateReader() {
  const id = await ask('Enter reader id to update: ');
  const name = await ask('New Name: ');
  const gender = await ask('New Gender: ');
  const birthday = await ask('New Birthday: ');
  const height = await ask('New Height: ');
  const weight = await ask('New Weight: ');
  const employment = await ask('New Employment: ');

  await sendRequest('/readers', 'put', {
    id: Number(id), name, gender, birthday, height: Number(height), weight: Number(weight), employment
  });
  console.log('Reader updated.');
  main();
}


main();
