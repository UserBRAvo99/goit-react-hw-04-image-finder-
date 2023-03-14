import { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ModalImg from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    modalOpen: false,
    largeImage: null,
  };

  OnClickGalleryItem = largeImageItem => {
    this.setState({
      largeImage: largeImageItem,
    });
    this.ModalToggle();
  };

  ModalToggle = () => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen,
    }));
  };

  render() {
    const { modalOpen, largeImage } = this.state;

    return (
      <>
        <ul className="ImageGallery">
          {this.props.img.map(item => {
            return (
              <ImageGalleryItem
                onClick={this.OnClickGalleryItem}
                data={item}
                key={shortid()}
              />
            );
          })}
        </ul>
        {modalOpen && (
          <ModalImg searchLargeImage={largeImage} onClose={this.ModalToggle} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  img: PropTypes.array.isRequired,
};

export default ImageGallery;
