import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => (
  <li className={css.ImageGalleryItem}>
    <img
      src={src}
      alt={alt}
      className={css.ImageGalleryItemImage}
      onClick={() => onClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
