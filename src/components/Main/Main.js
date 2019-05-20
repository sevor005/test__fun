import React from 'react';
import RouteList from '../RouteList/RouteList';
import MapComponent from './../MapComponent/MapComponent';

class Main extends React.Component {

  state = {
    points : []
  };

  addPointToState = point => this.setState( {points: [...this.state.points, point ]} );

  clearPointsList = () => {
    const points = [];

    this.setState({ points }, this.deleteGeoObjects());
  };

  deletePoint = pointId => {
    const points = this.state.points.filter(point => point.id !== pointId);

    this.setState({ points }, this.deleteGeoObjects());
  };

  deleteGeoObjects = () => {
    this.myMap.geoObjects.removeAll();
  };

  getId = () => {
    const {points} = this.state;
    const biggest = points.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  };

  createNewPoint = event => {
    const id = this.getId();
    const newPoint = {
      title: event.currentTarget.value,
      id,
      marker: this.createNewGeoObject(event),
    };

    this.addPointToState(newPoint);
  };

  createNewGeoObject = (event) => {
    const {ymaps} = window;
    const centerMap = this.myMap.getCenter();
    const newGeoObject = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: centerMap
      },
      properties: {
        iconContent: event.currentTarget.value,
        balloonContent: event.currentTarget.value
      }
    }, {
      preset: 'islands#blackStretchyIcon',
      draggable: true
    });

    newGeoObject.events.add('drag', this.updatePolyline);

    return newGeoObject;
  };

  creatorPoints = (event) => {
    if(event.key === 'Enter') {
      if(event.currentTarget.value === '') return;

      this.createNewPoint(event);

      event.currentTarget.value = '';
    };
  };

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
      <div>
        <div>
          <RouteList
            points={this.state.points}
            deletePoint={this.deletePoint}
            clearPointsList={this.clearPointsList}
            creatorPoints={this.creatorPoints}
            addToMap={this.addToMap}
            updateListPoints={this.updateListPoints}
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
