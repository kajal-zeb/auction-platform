import React from 'react';
import TrophyCup from '../../../assets/images/trophy.png';

const Trophy = (props) => {
  return (
    <img src={TrophyCup} width={props.width || 30} height={props.height || 30} />
  );
};

export default Trophy;
