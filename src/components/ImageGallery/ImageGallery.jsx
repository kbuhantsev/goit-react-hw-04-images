import UlStyled from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { PixabaySettings } from 'constants';

function ImageGallery({ galleryItems }) {
  useEffect(() => {
    const galleryRef = document.getElementById('galleryList');
    if (galleryRef.children.length > PixabaySettings.PER_PAGE) {
      scrollDown();
    }
  }, [galleryItems]);

  const scrollDown = () => {
    window.scrollBy({
      top: window.screen.availHeight / 2,
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

export default ImageGallery;
