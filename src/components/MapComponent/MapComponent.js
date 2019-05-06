import React, {Component} from 'react';
import Script from 'react-load-script';
import styles from './MapComponent.module.css';

class MapComponent extends Component {

  handleScriptLoad = () => {
    const {ymaps} = window;
    ymaps.ready(this.init);
  }

  init = () => {
    const {ymaps} = window;
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 5,
      controls: []
    });
    return myMap;
  }

  addMarkersForMap = (myMap) => {
    const {addToMap} = this.props;
    addToMap(myMap);
  }

  render() {
    const instanceMap = this.init();
    return (
      <div>
        <Script
          url="https://api-maps.yandex.ru/2.1/?&lang=ru_RU"
          onLoad={this.handleScriptLoad}
        />
        <button onClick={() => this.addMarkersForMap(instanceMap)}>Add marker</button>
        <div id='map' className={styles.containerMap}></div>
      </div>
    )
  }
}

export default MapComponent;
