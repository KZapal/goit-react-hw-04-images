import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt={tags}
        largeImageURL={largeImageURL}
        onClick={onImageClick}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array,
  onImageClick: PropTypes.func,
};

export default ImageGallery;
