import React from 'react';
import styles from './RoutePoint.module.css';

const RoutePoint = (props) => {

  const deletePoint = () => {
    const {onDeletePoint, pointId} = props;
    onDeletePoint(pointId);
  };

  const pathImgDelete = 'https://www.clipartmax.com/png/middle/209-2095674_trash-bin-comments-waste.png';

  return (
    <div className={styles.point}>
      <span>{props.pointTitle}</span>
      <img src={pathImgDelete} alt='X' className={styles.deleteImg} onClick={deletePoint} />
    </div>
  )
}

export default RoutePoint;

