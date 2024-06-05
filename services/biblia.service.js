import axios from 'axios';

const API_URL = 'https://www.abibliadigital.com.br/api';

export const getBookDetails = async (abbrev) => {
  try {
    const response = await axios.get(`${API_URL}/books/${abbrev}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const getChapters = async (bookAbbrev) => {
  const response = await axios.get(`${API_URL}/books/${bookAbbrev}`);
  return response.data.chapters;
};

export const getVerses = async (version, bookAbbrev, chapter) => {
  const response = await axios.get(`${API_URL}/verses/${version}/${bookAbbrev}/${chapter}`);
  return response.data.verses;
};
