import ButtonStyled from './Button.styled';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load more
    </ButtonStyled>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
