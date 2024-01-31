import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    images: [],
    loading: false,
    searchQuery: '',
    page: 1,
    largeImageURL: '',
    showModal: false,
    allImagesLoaded: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      allImagesLoaded: false,
    });
  };

  fetchImages = () => {
    const { searchQuery, page, images } = this.state;
    const API_KEY = '41236626-85b007b23c35ddfe2334f7f05';

    this.setState({ loading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const newImages = response.data.hits.filter(
          image => !images.some(existingImage => existingImage.id === image.id)
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          page: prevState.page + 1,
        }));
        if (newImages.length === 0) {
          this.setState({ allImagesLoaded: true });
        }
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = (largeImageURL = '') => {
    this.setState(state => ({
      showModal: !state.showModal,
      largeImageURL,
    }));
  };

  render() {
    const { images, loading, largeImageURL, showModal, allImagesLoaded } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onImageClick={this.toggleModal} />
        {loading && <Loader />}
        {!!images.length && !loading && !allImagesLoaded && (
          <Button onLoadMore={this.fetchImages} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
