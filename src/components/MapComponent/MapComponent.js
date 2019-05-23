import React from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import styles from './MapComponent.module.css';

const MapComponent = (props) => {

  const handleScriptLoad = () => {
    const {ymaps} = window;
    ymaps.ready(init);
  }

  const init = () => {
    const {ymaps} = window;
    const {loadMap} = props;
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 5,
      controls: []
    });

    loadMap(myMap)
  }

  return (
    <div>
      <Script
        url="https://api-maps.yandex.ru/2.1/?&lang=ru_RU"
        onLoad={handleScriptLoad}
      />
      <div id='map' className={styles.containerMap}></div>
    </div>
  )
};

MapComponent.propTypes = {
  loadMap: PropTypes.func
}

export default MapComponent;
