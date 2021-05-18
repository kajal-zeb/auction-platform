import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import sample from '../../../assets/images/canvas.png';
import classes from './ArtBlock.module.scss';
import InnerImageZoom from 'react-inner-image-zoom';

const Art = (props) => {
  return (
    <div className={`${classes.artBlockContainer}`}>
      <InnerImageZoom
        src={sample}
        className={`${classes.artBlock}`}
        zoomSrc={sample}
        zoomType={'hover'}
        moveType={'drag'}
      />
      <a
        target='_blank'
        href='https://sandbox.poap.art/ERhmvK/-906.96958,-1782.65609@1'
      >
        {'>> See full art <<'}
      </a>
    </div>
  );
};
export default Art;
