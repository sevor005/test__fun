import React from 'react';
import PropTypes from 'prop-types';
import styles from  './RouteList.module.css';
import PointsList from '../PointsList/PointsList';
import RouteFooter from '../RouteFooter/RouteFooter';
import RoutePointCreater from '../RoutePointCreater/RoutePointCreater';
import MarkerList from '../MarkerList/MarkerList';

const RouteList = (props) => {
  const {
    points,
    deletePoint,
    clearPointsList,
    creatorPointsToEnter,
    myMap,
    updateListPoints,
    inputValue,
    creatorPointsToClick,
    changeInputValue} = props;

  return(
    <div className={styles.list}>
      <RoutePointCreater
        creatorPointsToEnter={creatorPointsToEnter}
        creatorPointsToClick={creatorPointsToClick}
        changeInputValue={changeInputValue}
        inputValue={inputValue}
      />
      <PointsList
        points={points}
        deletePoint={deletePoint}
        updateListPoints={updateListPoints}
      />

      <MarkerList
        myMap={myMap}
        points={points}
      />

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
  pointsLength: PropTypes.number,
  creatorPoints: PropTypes.func,
  addToMap: PropTypes.func,
  updateListPoints: PropTypes.func,
  changeInputValue: PropTypes.func,
  inputValue: PropTypes.string
};

export default RouteList;
