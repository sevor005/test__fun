import React, {Component} from 'react';
import styles from  './RouteList.module.css';
import PointsList from '../PointsList/PointsList';
import RouteFooter from '../RouteFooter/RouteFooter';
import RoutePointCreater from '../RoutePointCreater/RoutePointCreater';

class RouteList extends Component {

  render() {
    const {points, deletePoint, clearPointsList, createNewPoint, createNewGeoObject} = this.props;

    return(
      <div className={styles.list}>
        <RoutePointCreater createNewPoint={createNewPoint} createNewGeoObject={createNewGeoObject} />
        <PointsList
          points={points}
          onDeletePoint={deletePoint}
        />

        <RouteFooter
          pointsLength={points.length}
          clearPointsList={clearPointsList}
        />
      </div>
    )
  }
}

export default RouteList;
