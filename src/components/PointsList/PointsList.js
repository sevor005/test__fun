import React from 'react';
import RoutePoint from './../RoutePoint/RoutePoint';
import styles from './PointsList.module.css';

const PointsList = (props) => {

  const {points, addToMap} = props;
  return(
    <div className={styles.pointsList}>
      {points.map(point => {
        const {onDeletePoint} = props;
        return <RoutePoint
          point={point}
          deleteCallback={onDeletePoint}
          key={point.id}
          />
      })}
      {addToMap()}
    </div>
  )
}

export default PointsList;
