import React from 'react';
import PropTypes from 'prop-types';
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
};

RoutePoint.propTypes = {
  onDeletePoint: PropTypes.func,
  pointId: PropTypes.number,
  pointTitle: PropTypes.string
};

export default RoutePoint;

