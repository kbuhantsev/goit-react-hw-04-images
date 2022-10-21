import React, { useEffect, useState } from 'react';
import GlobalStyles from './GlobalStyles';

import Searchbar from './Searchbar';
import Container from './Container';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Box } from './Box';
import usePixabay from './hooks/usePixabay';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [loadMoreEnabled, setLoadMoreEnabled] = useState(false);
  const [status, setStatus] = useState('idle');
  const { setNewQuery, nextPage, data } = usePixabay();

  useEffect(() => {
    if (!data) return;
    const { hits } = data;
    if (!hits.length) {
      setStatus(Status.REJECTED);
      return;
    }
    setPictures(pictures => {
      return [...pictures, ...hits];
    });
    setStatus(Status.RESOLVED);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const { hits, totalHits } = data;
    setLoadMoreEnabled(pictures.length + hits.length < totalHits);
  }, [pictures, data]);

  const onSearch = ({ text }) => {
    setStatus(Status.PENDING);
    setPictures([]);
    setNewQuery(text);
  };

  const onLoadMoreButtonClick = async () => {
    setStatus(Status.PENDING);
    nextPage();
  };

  const getCuttentMarkup = () => {
    let markup = '';
    if (status === Status.IDLE) {
      markup = (
        <Box as="h2" margin="0 auto">
          <p>Let`s start to search images 👀</p>
        </Box>
      );
    } else if (status === Status.PENDING) {
      markup = (
        <>
          <ImageGallery galleryItems={pictures} />
          <Loader />
        </>
      );
    } else if (status === Status.RESOLVED) {
      markup = (
        <>
          <ImageGallery galleryItems={pictures} />
          {loadMoreEnabled && <Button onClick={onLoadMoreButtonClick} />}
        </>
      );
    } else if (status === Status.REJECTED) {
      markup = (
        <Box as="h2" margin="0 auto">
          <p>❗Oooops, try again❗</p>
        </Box>
      );
    }
    return markup;
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Searchbar onSearch={onSearch} />
        {getCuttentMarkup()}
        <ToastContainer />
      </Container>
    </>
  );
}
