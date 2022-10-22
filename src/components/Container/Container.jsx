import { Box } from 'components/Box';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
      {children}
    </Box>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
