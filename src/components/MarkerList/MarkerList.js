import React from 'react';
import PropTypes from 'prop-types';

const MarkerList = (props) => {
  const renderGeoMarker = () => {
    const { myMap, points } = props;

    points.map(geo => myMap.geoObjects.add(geo.marker));
  }

  return <div>{ renderGeoMarker() }</div>
};

MarkerList.propTypes = {
  myMap: PropTypes.object,
  points: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    marker: PropTypes.object
  }))
};

export default MarkerList;
