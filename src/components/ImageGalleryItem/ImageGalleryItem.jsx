import PropTypes from 'prop-types';

function ImageGalleryItem({ onClick, data }) {
  function openModal() {
    onClick(data.largeImageURL);
  }
  return (
    <li onClick={openModal} className="ImageGalleryItem" id={data.id}>
      <img
        src={data.webformatURL}
        alt={data.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
