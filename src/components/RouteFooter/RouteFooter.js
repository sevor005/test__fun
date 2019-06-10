import React from 'react';
import PropTypes from 'prop-types';
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
          className={pointsLength === 0 ? styles.clearCompletedDisabled: styles.clearCompleted}
          onClick={clearPointsList}
        >
          Clear list
        </button>
      </div>
    </div>
  )
};

RouteFooter.propTypes = {
  pointsLength: PropTypes.number,
  clearPointsList: PropTypes.func
};

export default RouteFooter;
