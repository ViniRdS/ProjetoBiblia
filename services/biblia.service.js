import axios from 'axios';

const API_URL = 'https://www.abibliadigital.com.br/api';

const api = axios.create({
  baseURL: API_URL,
});

const getBookDetails = async (abbrev) => {
  try {
    const response = await api.get(`/books/${abbrev}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book details for ${abbrev}:`, error);
    throw new Error('Failed to fetch book details');
  }
};

const getBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

const getChapters = async (bookAbbrev) => {
  try {
    const response = await api.get(`/books/${bookAbbrev}`);
    return response.data.chapters;
  } catch (error) {
    console.error(`Error fetching chapters for ${bookAbbrev}:`, error);
    throw new Error('Failed to fetch chapters');
  }
};

const getVerses = async (version, bookAbbrev, chapter) => {
  try {
    const response = await api.get(`/verses/${version}/${bookAbbrev}/${chapter}`);
    return response.data.verses;
  } catch (error) {
    console.error(`Error fetching verses for ${version}/${bookAbbrev}/${chapter}:`, error);
    throw new Error('Failed to fetch verses');
  }
};

export {getBookDetails, getBooks, getChapters, getVerses};