import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';

import Searchbar from './Searchbar';
import Container from './Container';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

import ApiPixabay from './utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Box } from './Box';

const API = new ApiPixabay();

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

  const onSearch = async ({ text }) => {
    setStatus(Status.PENDING);

    API.query = text;
    API.resetPage();
    try {
      const { hits, totalHits } = await API.getImages();
      if (!hits.length) {
        setStatus(Status.REJECTED);
        return;
      }
      setPictures([...hits]);
      setLoadMoreEnabled(hits.length < totalHits);
      setStatus(Status.RESOLVED);
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
      setStatus(Status.REJECTED);
    }
  };

  const onLoadMoreButtonClick = async () => {
    setStatus(Status.PENDING);
    try {
      const { hits, totalHits } = await API.getImages();
      setPictures(pictures => {
        return [...pictures, ...hits];
      });
      setLoadMoreEnabled(pictures.length + hits.length < totalHits);
      setStatus(Status.RESOLVED);
    } catch (error) {
      setStatus(Status.REJECTED);
    }
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
