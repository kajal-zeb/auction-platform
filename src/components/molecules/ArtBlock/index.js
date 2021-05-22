import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import sample from '../../../assets/images/nft-img.jpg';
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
        href='https://app.poap.art/ByEl3W'
      >
        {'>> See full art <<'}
      </a>
    </div>
  );
};
export default Art;
