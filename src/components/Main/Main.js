import React from 'react';
import RouteList from '../RouteList/RouteList';
import MapComponent from './../MapComponent/MapComponent';

class Main extends React.Component {

  state = {
    points : [],
    pointsGeoObjects: [],
    isLoading: false,
  }

  addPointToState = point => this.setState( {points: [...this.state.points, point ]} );
  addGeoObjectToState = pointGeoObject => this.setState( {pointsGeoObjects: [...this.state.pointsGeoObjects, pointGeoObject]}, () => console.log(this.state.pointsGeoObjects) );

  clearPointsList = () => this.setState({ points: [], pointsGeoObjects: [] });

  deletePoint = pointId => {
    this.setState({
      points: this.state.points.filter((item) => {
        return item.id !== pointId;
      }),
      pointsGeoObjects: this.state.pointsGeoObjects.filter((geoObjects) => {
        return geoObjects.id !== pointId;
      })
    })
  }

  getId = () => {
    const {points} = this.state;
    const biggest = points.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  createNewPoint = event => {
    const id = this.getId();
    if(event.key === 'Enter') {

      if(event.currentTarget.value === '') return;

      const newPoint = {
        title: event.currentTarget.value,
        id
      };

      this.addPointToState(newPoint)

      event.currentTarget.value = ''
    }
  }

  createNewGeoObject = (event) => {
    const {ymaps} = window;
    if(event.key === 'Enter') {
      if(event.currentTarget.value === '') return;

      const newGeoObject = new ymaps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: [55.76, 37.64]
        },
        properties: {
          balloonContent: event.currentTarget.value,
          hintContent: event.currentTarget.value
        }
      }, {
        preset: 'islands#blackStretchyIcon',
        draggable: true
      });

      this.addGeoObjectToState(newGeoObject);

      event.currentTarget.value = ''
    }
  }

  addToMap = (initMap) => {
    const {pointsGeoObjects} = this.state;
    pointsGeoObjects.map(marker => initMap.geoObjects.add(marker));
  }

  render() {
    return (
      <div>
        <div>
          <RouteList
            points={this.state.points}
            deletePoint={this.deletePoint}
            clearPointsList={this.clearPointsList}
            createNewPoint={this.createNewPoint}
            createNewGeoObject={this.createNewGeoObject}
          />
        </div>
        <div>
          <MapComponent
            pointsGeoObjects={this.state.pointsGeoObjects}
            addToMap={this.addToMap}
            isLoading={this.state}
          />
        </div>
      </div>
    )
  }
}

export default Main;
