import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const params = new URLSearchParams({
  key: '41236626-85b007b23c35ddfe2334f7f05',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

const fetchImages = async (searchQuery, page) => {
  const res = await axios.get(`?q=${searchQuery}&page=${page}&${params}`);
  const data = res.data;

  return data;
};

export default fetchImages;
