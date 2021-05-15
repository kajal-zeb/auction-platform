import React, { useEffect } from 'react';
import classes from './Avatar.module.scss';

const Avatar = (props) => {
  return (
    <>
      <div
        className={`${classes.avatar}`}
        style={{
          background: `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')}`,
          color: `#${(
            Number(
              `0x1${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0')}`
            ) ^ 0xffffff
          )
            .toString(16)
            .substr(1)
            .toUpperCase()}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          height: props.height || 20,
          width: props.width || 20,
        }}
      >
        {props.initial}
      </div>
      &nbsp;
    </>
  );
};

export default Avatar;
