import React from 'react';
import RoutePoint from './../RoutePoint/RoutePoint';
import styles from './PointsList.module.css';
import { DragDropContext } from 'react-beautiful-dnd';

const PointsList = (props) => {

  const {points} = props;
  return(
    <DragDropContext>
      <div className={styles.pointsList}>
        {points.map(point => {
          const {onDeletePoint} = props;
          return <RoutePoint
            pointId={point.id}
            pointTitle={point.title}
            onDeletePoint={onDeletePoint}
            key={point.id}
            />
        })}
      </div>
    </DragDropContext>
  )
}

export default PointsList;
