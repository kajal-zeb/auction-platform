import React, {useEffect, useState } from 'react';
import { Image} from 'antd';
import sample from "../../../assets/samples/sample_pizza.jpg"
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
       </div>
    )
}
export default Art;