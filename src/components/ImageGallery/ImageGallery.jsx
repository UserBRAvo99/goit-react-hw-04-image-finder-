import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ModalImg from 'components/Modal/Modal';

function ImageGallery({ img }) {
  const [largeImage, setLargeImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const OnClickGalleryItem = largeImageItem => {
    setLargeImage(largeImageItem);
    ModalToggle();
  };

  const ModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <ul className="ImageGallery">
        {img.map(item => {
          return (
            <ImageGalleryItem
              onClick={OnClickGalleryItem}
              data={item}
              key={shortid()}
            />
          );
        })}
      </ul>
      {modalOpen && (
        <ModalImg searchLargeImage={largeImage} onClose={ModalToggle} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  img: PropTypes.array.isRequired,
};

export default ImageGallery;
