import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoutePointCreater.module.css';

const RoutePointCreater = (props) => {
  const {creatorPointsToEnter, creatorPointsToClick, changeInputValue, inputValue} = props;
  return(
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        onKeyPress={creatorPointsToEnter}
        type='text'
        onChange={changeInputValue}
        value={inputValue}
        placeholder='enter the route...'
      />
      <button
        className={inputValue === '' ? styles.buttonDisabled : styles.button}
        onClick={creatorPointsToClick}
      >
        Add Point
      </button>
    </div>
  )
}

RoutePointCreater.propTypes = {
  creatorPointsToEnter: PropTypes.func,
  creatorPointsToClick: PropTypes.func,
  changeInputValue: PropTypes.func,
  inputValue: PropTypes.string
}

export default RoutePointCreater;
