import React from 'react';
import RouteList from '../RouteList/RouteList';
import MapComponent from './../MapComponent/MapComponent';

class Main extends React.Component {

  state = {
    points : [],
    pointsGeoObjects: []
  }

  addPointToState = point => this.setState( {points: [...this.state.points, point ]} );
  addGeoObjectToState = geoObjects => this.setState( {pointsGeoObjects: [...this.state.pointsGeoObjects, geoObjects]});

  clearPointsList = () => this.setState({ points: [], pointsGeoObjects: [] });

  deletePoint = pointId => {

    this.setState({
      points: this.state.points.filter(item => {
        return item.id !== pointId;
      }),
      pointsGeoObjects: this.state.pointsGeoObjects.map(marker => {
        if(marker.properties._data.id === pointId) {
          this.deleteGeoObject(marker);
        }
        return marker;
      })
    }, () => console.log(this.state.pointsGeoObjects))
  }

  deleteGeoObject = (marker) => {
    this.myMap.geoObjects.remove(marker);
  }

  getId = () => {
    const {points} = this.state;
    const biggest = points.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  createNewPoint = event => {
    this.id = this.getId();
    const newPoint = {
      title: event.currentTarget.value,
      id: this.id,
    };

    this.addPointToState(newPoint)
  }

  createNewGeoObject = (event) => {
    const {ymaps} = window;
    const newGeoObject = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: [55.76, 37.64]
      },
      properties: {
        iconContent: event.currentTarget.value,
        balloonContent: event.currentTarget.value,
        id: this.id
      }
    }, {
      preset: 'islands#blackStretchyIcon',
      draggable: true
    });

    this.addGeoObjectToState(newGeoObject);
  }

  creatorPoints = (event) => {
    if(event.key === 'Enter') {
      if(event.currentTarget.value === '') return;

      this.createNewPoint(event);
      this.createNewGeoObject(event);

      event.currentTarget.value = '';
    }
  }

  loadMap = myMap => this.myMap = myMap;

  addToMap = () => {
    const {pointsGeoObjects} = this.state;
    pointsGeoObjects.map(marker => this.myMap.geoObjects.add(marker));
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
