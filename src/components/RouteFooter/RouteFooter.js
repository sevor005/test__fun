import React from 'react';
import styles from  './RouteFooter.module.css';

const RouteFooter = (props) => {

  const {pointsLength, clearPointsList} = props;
  return(
    <div className={styles.routeFooter}>
      <div>
        {pointsLength === 0 ?
          <span className={styles.pointsNotLength}>no current route...</span> :
          <span className={styles.pointsLength} >{pointsLength} current route</span>
        }
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.clearCompleted}
          onClick={clearPointsList}>
          Clear list
        </button>
      </div>
    </div>
  )
}

export default RouteFooter;
