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
      zoom: 4,
      controls: []
    });

    this.props.getInstanceMap(myMap)
  }

  render() {
    return (
      <div>
        <Script
          url="https://api-maps.yandex.ru/2.1/?&lang=ru_RU"
          onLoad={this.handleScriptLoad}
        />
        <div id='map' className={styles.containerMap}></div>
      </div>
    )
  }
}

export default MapComponent;
