import { Component } from 'react';
import { getImgs } from './fetch';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ReadMoreBtn from './ReadMoreBtn';
import Loader from './Loader';
import Toastify from './Toastify/Toastify';

class Wrapper extends Component {
  state = {
    data: [],
    totalHits: 0,
    search: '',
    page: 1,
    perPage: 20,
    modalGallery: false,
    isLoading: false,
    isDownloadHits: false,
    error: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.getData();
    }
  }

  getData = async () => {
    try {
      this.setState({ isLoading: true });
      const {
        data: { hits, totalHits },
      } = await getImgs(this.state.search, this.state.page, this.state.perPage);
      if (hits.length === 0) {
        this.setState({ isDownloadHits: true });
        return;
      }
      this.setState(prev => ({
        data: [...prev.data, ...hits],
        totalHits: totalHits,
      }));
    } catch (e) {
      this.setState({ error: true });
      throw new Error(e);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  formOnSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputValue = form.elements.search.value.toLowerCase().trim();
    if (inputValue.length === 0) {
      this.setState({ data: [] });
      return;
    }
    this.setState({
      search: inputValue,
      data: [],
      page: 1,
      perPage: 20,
      totalHits: 0,
    });
    form.elements.search.value = '';
  };

  loadMoreBtnClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { isLoading, data, totalHits, isDownloadHits, error } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.formOnSubmit} />
        {isDownloadHits && <Toastify massage="There is no such request" />}
        {error && <Toastify massage="Server error" />}
        <ImageGallery img={data} />
        {isLoading && <Loader />}
        {data.length > 0 && data.length < totalHits && (
          <ReadMoreBtn title="Load More" event={this.loadMoreBtnClick} />
        )}
      </div>
    );
  }
}

export default Wrapper;
