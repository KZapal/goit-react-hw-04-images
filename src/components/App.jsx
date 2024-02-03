import React, { useState, useEffect } from 'react';
import fetchImages from './api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      const { hits, totalHits } = await fetchImages(searchQuery, page);

      if (totalHits === 0) {
        alert('0 results');
        setLoading(false);
        return;
      }

      setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
      setTotalHits(prevTotalHits =>
        page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
      );
      setLoading(false);
    };

    fetchData().catch(error => {
      alert(`Oops! Something went wrong! ${error}`);
      setLoading(false);
    });
  }, [page, searchQuery]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    // setAllImagesLoaded(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL = '') => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div className={css.App}>
      <Searchbar onChangeQuery={onChangeQuery} />
      <ImageGallery images={images} onImageClick={toggleModal} />
      {loading && <Loader />}
      {!!totalHits && !loading && <Button onLoadMore={loadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
    </div>
  );
};

export default App;
