import UlStyled from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { PixabaySettings } from 'constants';

const { QUERY_PARAMS } = PixabaySettings;

export default function ImageGallery({ galleryItems }) {
  useEffect(() => {
    const galleryRef = document.getElementById('galleryList');
    if (galleryRef.children.length > QUERY_PARAMS.per_page) {
      scrollDown();
    }
  }, [galleryItems]);

  const scrollDown = () => {
    window.scrollBy({
      top: window.screen.availHeight / 3,
      behavior: 'smooth',
    });
  };

  return (
    <UlStyled id="galleryList">
      {galleryItems.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </UlStyled>
  );
}

ImageGallery.propTypes = {
  galleryItems: PropTypes.array,
};
