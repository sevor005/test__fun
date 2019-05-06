import React from 'react';
import styles from './RoutePointCreater.module.css';

const RoutePointCreater = (props) => {
  const {createNewGeoObject} = props;
  return(
    <div>
      <input onKeyPress={createNewGeoObject} className={styles.input} placeholder='enter the route...' />
    </div>
  )
}

export default RoutePointCreater;
