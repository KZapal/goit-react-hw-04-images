import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // const prevSearchQuery = useRef(null);
  // const prevSearchQueryValue = prevSearchQuery.current;

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchImages();
  }, [searchQuery]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setAllImagesLoaded(false);
  };

  const fetchImages = () => {
    const API_KEY = '41236626-85b007b23c35ddfe2334f7f05';

    setLoading(true);

    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const newImages = response.data.hits.filter(
          image => !images.some(existingImage => existingImage.id === image.id)
        );

        setImages([...images, ...newImages]);
        setPage(page + 1);

        if (newImages.length === 0) {
          setAllImagesLoaded(true);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
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
      {!!images.length && !loading && !allImagesLoaded && (
        <Button onLoadMore={fetchImages} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
    </div>
  );
};

export default App;
