import React from 'react';
import styles from  './RouteList.module.css';
import PointsList from '../PointsList/PointsList';
import RouteFooter from '../RouteFooter/RouteFooter';
import RoutePointCreater from '../RoutePointCreater/RoutePointCreater';
import MarkerList from '../MarkerList/MarkerList';

const RouteList = (props) => {
  const {points, deletePoint, clearPointsList, creatorPoints, addToMap} = props;

  return(
    <div className={styles.list}>
      <RoutePointCreater creatorPoints={creatorPoints} />
      <PointsList
        points={points}
        onDeletePoint={deletePoint}
      />

      <MarkerList addToMap={addToMap} />

      <RouteFooter
        pointsLength={points.length}
        clearPointsList={clearPointsList}
      />
    </div>
  )
}

export default RouteList;
