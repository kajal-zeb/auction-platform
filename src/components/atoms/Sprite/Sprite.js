import React from 'react';
import PropTypes from 'prop-types';
import sprite from '../../../assets/svgs/icon-sprite.svg';

const Sprite = props => {
    return (
        <svg  viewBox={`0 0 ${props.width} ${props.height}`} width={`${props.width}px`} height={`${props.height}px`} {...props}>
            <use  href={`${sprite}#${props.id}`}></use>
        </svg>
    );
};
Sprite.defaultProps = {};

Sprite.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};

export default Sprite;
