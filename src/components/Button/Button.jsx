import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore }) => (
  <button type="button" className={css.Button} onClick={onLoadMore}>
    Load more
  </button>
);

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
