import { useState, useEffect } from 'react';
import { getImgs } from './fetch';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ReadMoreBtn from './ReadMoreBtn';
import Loader from './Loader';
import Toastify from './Toastify/Toastify';

function Wrapper() {
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPages] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadHits, setIsDownloadsHits] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const {
          data: { hits, totalHits },
        } = await getImgs(search, page, perPage);
        if (hits.length === 0) {
          setIsDownloadsHits(true);
          return;
        }
        setData(prev => [...prev, ...hits]);
        setTotalHits(totalHits);
      } catch (e) {
        setError(true);
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (search) {
      getData();
    }
  }, [search, page, perPage]);

  const formOnSubmit = event => {
    event.preventDefault();
    const formEvent = event.currentTarget;
    const inputValue = formEvent.elements.search.value.toLowerCase().trim();

    if (inputValue.length === 0) {
      setData([]);
      return;
    }
    if (search === inputValue) return;

    setSearch(inputValue);
    setData([]);
    setPages(1);
    setPerPage(20);
    setTotalHits(0);

    formEvent.elements.search.value = '';
  };

  const loadMoreBtnClick = () => {
    setPages(prev => prev + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={formOnSubmit} />
      {isDownloadHits && <Toastify massage="There is no such request" />}
      {error && <Toastify massage="Server error" />}
      <ImageGallery img={data} />
      {isLoading && <Loader />}
      {data.length > 0 && data.length < totalHits && (
        <ReadMoreBtn title="Load More" event={loadMoreBtnClick} />
      )}
    </div>
  );
}

export default Wrapper;
