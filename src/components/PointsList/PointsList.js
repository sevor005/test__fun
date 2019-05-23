import React from 'react';
import PropTypes from 'prop-types';
import RoutePoint from './../RoutePoint/RoutePoint';
import styles from './PointsList.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PointsList = (props) => {

  const updatePoints = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    const {destination} = result;
    const {updateListPoints} = props;

    if(!destination) {return};

    const points = updatePoints(props.points, result.source.index, result.destination.index);

    updateListPoints(points)
  };

  return(
    <div className={styles.pointsList}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {providerList => (
            <div ref={providerList.innerRef}>
              {props.points.map((point, index) => (
                <Draggable key={point.id} draggableId={point.id} index={index}>
                  {providerPoint => (
                    <div
                      ref={providerPoint.innerRef}
                      {...providerPoint.draggableProps}
                      {...providerPoint.dragHandleProps}
                    >
                      <RoutePoint
                        pointId={point.id}
                        pointTitle={point.title}
                        onDeletePoint={props.onDeletePoint}
                        key={point.id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {providerList.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

PointsList.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    marker: PropTypes.object
  })),
  onDeletePoint: PropTypes.func,
  updateListPoints: PropTypes.func
};

export default PointsList;
