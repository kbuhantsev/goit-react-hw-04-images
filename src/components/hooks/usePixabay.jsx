import { useState, useEffect } from 'react';
import axios from 'axios';
import { PixabaySettings } from 'constants';

const { API_KEY, PER_PAGE, BASE_URL } = PixabaySettings;

export default function usePixabay() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      const URL = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`;
      const response = await axios.get(URL);
      setData(response.data);
    };
    if (query) {
      getImages();
    }
  }, [page, query]);

  const nextPage = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
  };

  const setNewQuery = newQuery => {
    setPage(1);
    setQuery(newQuery);
  };

  return { setNewQuery, nextPage, data };
}
