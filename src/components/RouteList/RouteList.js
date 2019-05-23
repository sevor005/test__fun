import React from 'react';
import PropTypes from 'prop-types';
import styles from  './RouteList.module.css';
import PointsList from '../PointsList/PointsList';
import RouteFooter from '../RouteFooter/RouteFooter';
import RoutePointCreater from '../RoutePointCreater/RoutePointCreater';
import MarkerList from '../MarkerList/MarkerList';

const RouteList = (props) => {
  const {points, deletePoint, clearPointsList, creatorPoints, addToMap, updateListPoints} = props;

  return(
    <div className={styles.list}>
      <RoutePointCreater creatorPoints={creatorPoints} />
      <PointsList
        points={points}
        onDeletePoint={deletePoint}
        updateListPoints={updateListPoints}
      />

      <MarkerList addToMap={addToMap} />

      <RouteFooter
        pointsLength={points.length}
        clearPointsList={clearPointsList}
      />
    </div>
  )
}

RouteList.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    marker: PropTypes.object
  })),
  deletePoint: PropTypes.func,
  clearPointsList: PropTypes.func,
  creatorPoints: PropTypes.func,
  addToMap: PropTypes.func,
  updateListPoints: PropTypes.func
};

export default RouteList;
