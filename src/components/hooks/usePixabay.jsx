import { useState, useEffect } from 'react';
import axios from 'axios';
import { PixabaySettings } from 'constants';

const { BASE_URL, QUERY_PARAMS } = PixabaySettings;

export default function usePixabay() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAxiosParams = () => {
      return {
        ...QUERY_PARAMS,
        q: query,
        page: page,
      };
    };

    const getImages = async () => {
      const response = await axios.get(BASE_URL, {
        params: getAxiosParams(),
      });
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
