import React, {Component} from 'react';
import styles from  './RouteList.module.css';
import PointsList from '../PointsList/PointsList';
import RouteFooter from '../RouteFooter/RouteFooter';
import RoutePointCreater from '../RoutePointCreater/RoutePointCreater';
import MarkerList from '../MarkerList/MarkerList';

class RouteList extends Component {

  render() {
    const {points, deletePoint, clearPointsList, creatorPoints, addToMap} = this.props;

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
}

export default RouteList;
