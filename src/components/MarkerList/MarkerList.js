import React from 'react';
import PropTypes from 'prop-types';

const MarkerList = (props) => {
  const {addToMap} = props;

  return <div> {addToMap()} </div>
};

MarkerList.propTypes = {
  addToMap: PropTypes.func
};

export default MarkerList;
