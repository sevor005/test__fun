import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoutePointCreater.module.css';

const RoutePointCreater = (props) => {
  const {creatorPoints} = props;
  return(
    <div>
      <input onKeyPress={creatorPoints} className={styles.input} placeholder='enter the route...' />
    </div>
  )
}

RoutePointCreater.propTypes = {
  creatorPoints: PropTypes.func
}

export default RoutePointCreater;
