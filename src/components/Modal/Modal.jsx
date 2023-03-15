import { useEffect } from 'react';
import PropTypes from 'prop-types';

function ModalImg({ searchLargeImage, onClose }) {
  useEffect(() => {
    const listenerKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', listenerKeyDown);
    return () => {
      document.removeEventListener('keydown', listenerKeyDown);
    };
  }, [onClose]);

  const ModalClose = event => {
    if (event.target.className === 'Overlay') {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={ModalClose}>
      <div className="Modal">
        <img src={searchLargeImage} alt="" />
      </div>
    </div>
  );
}

ModalImg.propTypes = {
  searchLargeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalImg;
