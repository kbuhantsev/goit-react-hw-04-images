import { useEffect } from 'react';
import { OverlayStyled, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');
export default function Modal({ item, onClose }) {
  const { largeImageURL, tags } = item;

  const onEscapePress = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscapePress);
    return () => {
      window.removeEventListener('keydown', onEscapePress);
    };
  });

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <OverlayStyled onClick={onBackdropClick}>
      <ModalStyled>
        <img src={largeImageURL} alt={tags} />
      </ModalStyled>
    </OverlayStyled>,
    modalRoot
  );
}

Modal.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
