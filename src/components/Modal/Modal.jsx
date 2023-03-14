import { Component } from 'react';

class ModalImg extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.listenerKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.listenerKeyDown);
  }

  listenerKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  ModalClose = event => {
    if (event.target.className === 'Overlay') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div
        className="Overlay"
        onClick={this.ModalClose}
        onKeyDown={this.listenerKeyDown}
      >
        <div className="Modal">
          <img src={this.props.searchLargeImage} alt="" />
        </div>
      </div>
    );
  }
}

export default ModalImg;
