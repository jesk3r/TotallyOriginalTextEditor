import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateDB')) {
        console.log('jateDB database already exists');
        return;
      }
      db.createObjectStore('jateDB', { keyPath: 'id', autoIncrement: true });
      console.log('jateDB database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, value: content });
  const result = await request;
  console.log('Data saved to the database', result.value);
}



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jateDB', 1);
  const tx = jateDb.transaction('jateDB', 'readonly');
  const store = tx.objectStore('jateDB');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}


initdb();
