import React, {useEffect, useState } from 'react';
import { Image} from 'antd';
import sample from "../../../assets/samples/sample_pizza.jpg"

import InnerImageZoom from 'react-inner-image-zoom';


const Art = (props) => {
    return (
       <div >
           <InnerImageZoom  
                src={sample} 
                width={'500px'}
                zoomSrc={sample} 
                // fullscreenOnMobile={true}
                // zoomScale={0.9}
                zoomType={'hover'}
                moveType={'drag'}
            // zoomSrc='/path/to/zoom-image.jpg'
             />
       </div>
    )
}
export default Art;