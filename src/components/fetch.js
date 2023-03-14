import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33349465-f6e14a947762518aeccde2783';
axios.defaults.baseURL = BASE_URL;

export const getImgs = async (text, page, perPage) => {
  const q = `?q=${text}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  const request = await axios.get(q);
  return request;
};
