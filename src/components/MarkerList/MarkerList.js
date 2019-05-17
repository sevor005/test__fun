import React from 'react';

const MarkerList = (props) => {
  const {addToMap} = props;

  return <div> {addToMap()} </div>
}

export default MarkerList;
