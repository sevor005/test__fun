import React from 'react';
import styles from './RoutePointCreater.module.css';

const RoutePointCreater = (props) => {
  const {creatorPoints} = props;
  return(
    <div>
      <input onKeyPress={creatorPoints} className={styles.input} placeholder='enter the route...' />
    </div>
  )
}

export default RoutePointCreater;
