import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoutePointCreater.module.css';

const RoutePointCreater = (props) => {
  const {creatorPointsToEnter, creatorPointsToClick} = props;
  return(
    <div className={styles.wrapperCreater}>
      <input onKeyPress={creatorPointsToEnter} className={styles.input} placeholder='enter the route...' />
      <button onClick={creatorPointsToClick}>Add item</button>
    </div>
  )
}

RoutePointCreater.propTypes = {
  creatorPoints: PropTypes.func
}

export default RoutePointCreater;
