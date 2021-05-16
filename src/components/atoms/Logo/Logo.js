import React from 'react';
import BitcoinPizza from '../../../assets/images/Bitcoin-Pizza-C19R-web-logo.png';

const Logo = (props) => {
  return (
    <img src={BitcoinPizza} width={props.width || 30} height={props.height || 30} />
  );
};

export default Logo;
