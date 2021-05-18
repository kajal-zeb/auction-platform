import React, { useEffect } from 'react';
import classes from './Avatar.module.scss';

const Avatar = (props) => {
  let randomNum = 0;
  if(props.name && props.name.length){
    const char1 = props.name[0];
    const char2 = props.name[props.name.indexOf(" ") + 1];
  
    randomNum = (char1.charCodeAt() + char2.charCodeAt())/1000;
    console.log(randomNum);
    
  }
  const background = `#${Math.floor(randomNum * 16777215).toString(16).padStart(6, '0')}`;
  console.log(background);
  const getContrast =  (hexcolor)=>{

    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
      hexcolor = hexcolor.slice(1);
    }
  
    // Convert to RGB value
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
  
    // Get YIQ ratio
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
    // Check contrast
    return (yiq >= 128) ? 'black' : 'white';
  
  };
  console.log(getContrast(background));
  const Color = getContrast(background);
  return (
    <>
      <div
        className={`${classes.avatar}`}
        style={{
          background: background,
          color: Color,
          //   color: `#${(
          //   Number(
          //     `0x1${Math.floor(randomNum * 16777215)
          //       .toString(16)
          //       .padStart(6, '0')}`
          //   ) ^ 0xffffff
          // )
          //   .toString(16)
          //   .substr(1)
          //   .toUpperCase()}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          height: props.height || 20,
          width: props.width || 20,
        }}
      >
        {props.name[0]}
      </div>
      &nbsp;
    </>
  );
};

export default Avatar;
