import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoutePointCreater.module.css';

const RoutePointCreater = (props) => {
  const {creatorPointsToEnter, creatorPointsToClick, changeInputValue, inputValue} = props;
  return(
    <div>
      <input
        className={styles.input}
        onKeyPress={creatorPointsToEnter}
        type='text'
        onChange={changeInputValue}
        value={inputValue}
        placeholder='enter the route...'
      />
      <button
        className={styles.button}
        onClick={creatorPointsToClick}
      >
        Добавить
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
