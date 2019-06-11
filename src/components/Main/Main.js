import React from 'react';
import RouteList from '../RouteList/RouteList';
import MapComponent from './../MapComponent/MapComponent';
import styles from './Main.module.css';

class Main extends React.Component {

  state = {
    points : [],
    inputValue: ''
  };

  addPointToState = (point) => this.setState( {points: [...this.state.points, point ]} );

  clearPointsList = () => {
    const points = [];

    this.setState({ points }, this.deleteGeoObjects());
  };

  deletePoint = (pointId) => {
    const points = this.state.points.filter(point => point.id !== pointId);

    this.setState({ points }, this.deleteGeoObjects());
  };

  deleteGeoObjects = () => {
    this.myMap.geoObjects.removeAll();
  };

  getId = () => {
    const { points } = this.state;
    const biggest = points.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  };

  changeInputValue = (event) => {
    this.setState({inputValue: event.currentTarget.value})
  };

  clearInputValue = () => this.setState({ inputValue: '' });

  createNewPoint = (event) => {
    const {inputValue} = this.state;
    const id = this.getId();
    const newPoint = {
      title: inputValue,
      id,
      marker: this.createNewGeoObject(event),
    };

    this.addPointToState(newPoint);
  };

  createNewGeoObject = () => {
    const {inputValue} = this.state;
    const {ymaps} = window;
    const centerMap = this.myMap.getCenter();
    const newGeoObject = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: centerMap
      },
      properties: {
        iconContent: inputValue,
        balloonContent: inputValue
      }
    }, {
      preset: 'islands#blackStretchyIcon',
      draggable: true
    });

    newGeoObject.events.add('drag', this.updatePolyline);

    return newGeoObject;
  };

  creatorPointsToEnter = (event) => {
    const {inputValue} = this.state;

    if(event.key === 'Enter') {
      if(inputValue === '') return;

      this.createNewPoint();
      this.clearInputValue();
    };
  };

  creatorPointsToClick = () => {
    const {inputValue} = this.state;

    if(inputValue === '') return;

    this.createNewPoint();
    this.clearInputValue();
  }

  loadMap = myMap => this.myMap = myMap;

  addToMap = () => {
    const {points} = this.state;
    points.map(geo => this.myMap.geoObjects.add(geo.marker));
  };

  createPolyline = () => {
    const {ymaps} = window;
    const {points} = this.state;
    const coordinates = points.map(geo => geo.marker.geometry.getCoordinates());

    this.polyline = new ymaps.Polyline(coordinates, {}, {strokeColor: '#999', strokeWidth: 3});
  };

  updatePolyline = () => {
    if(this.polyline) {
      this.deletePolyline(this.polyline);
    }

    this.createPolyline();
    this.addPolylineForMap(this.polyline);
  };

  deletePolyline = (polyline) => {
    this.myMap.geoObjects.remove(polyline);
  };

  addPolylineForMap = (polyline) => {
    this.myMap.geoObjects.add(polyline);
  };

  updateListPoints = (newListPoints) => {
    const points = newListPoints.map(point => ({
      title: point.title,
      id: point.id,
      marker: point.marker,
    }));

    this.setState({ points }, this.updatePolyline)
  }

  render() {
    return (
      <div className={styles.main}>
        <div>
          <RouteList
            points={this.state.points}
            deletePoint={this.deletePoint}
            clearPointsList={this.clearPointsList}
            creatorPointsToEnter={this.creatorPointsToEnter}
            creatorPointsToClick={this.creatorPointsToClick}
            addToMap={this.addToMap}
            updateListPoints={this.updateListPoints}
            changeInputValue={this.changeInputValue}
            inputValue={this.state.inputValue}
          />
        </div>
        <div>
          <MapComponent
            loadMap={this.loadMap}
          />
        </div>
      </div>
    )
  }
}

export default Main;
