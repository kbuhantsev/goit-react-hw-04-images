import Modal from '../Modal';
import { useState } from 'react';
import { LiStyled, ImgStyled } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { webformatURL, tags } = item;

  const toggleModal = () => {
    console.log('toggleModal');
    setIsModalOpen(prevState => {
      setIsModalOpen(!prevState);
    });
  };

  return (
    <>
      <LiStyled>
        <ImgStyled
          loading="lazy"
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      </LiStyled>
      {isModalOpen && <Modal item={item} onClose={toggleModal} />}
    </>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
