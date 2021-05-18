import React from 'react';
import PropTypes from 'prop-types';
import styles from './title.module.scss';
const Title = props => {
    let markup = '';
    let classes = `${styles.heading} ${styles[props.spacing]} ${styles[props.theme || 'dark']}
        ${styles[props.align || 'left']}
        ${props.uppercase ? styles.uppercase : ''}
        ${props.capitalize ? styles.capitalize : ''}`;
    
    switch (props.tag) {
        case 'h1':
            markup = (
                <h1 className={classes} style={{fontWeight: props.weight}} {...props}>
                    {props.children}
                </h1>
            );
            break;
        case 'h2':
            markup = (
                <h2 className={classes} style={{fontWeight: props.weight, wordBreak:props.break}}   >
                    {props.children}
                </h2>
            );
            break;
        case 'h3':
            markup = (
                <h3 className={classes} style={{fontWeight: props.weight, wordBreak:props.break}}   >
                    {props.children}
                </h3>
            );
            break;
        case 'h4':
            markup = (
                <h4 className={classes} style={{fontWeight: props.weight, wordBreak:props.break}}   >
                    {props.children}
                </h4>
            );
            break;
        case 'h5':
            markup = (
                <h5 className={classes} style={{fontWeight: props.weight, wordBreak:props.break}}   >
                    {props.children}
                </h5>
            );
            break;
        case 'h6':
            markup = (
                <h6 className={classes} style={{fontWeight: props.weight, wordBreak:props.break}}   >
                    {props.children}
                </h6>
            );
            break;
        default:
            markup = (
                <h3 className={classes} style={{fontWeight: props.weight, wordBreak:props.break}} {...props}  >
                    {props.children}
                </h3>
            );
            break;
    }
    return markup;
};

Title.defaultProps = {
    children: '',
};

Title.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
        .isRequired,
    spacing: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'none']),
    theme: PropTypes.oneOf(['light', 'dark', 'red']),
    capitalize: PropTypes.bool,
    align:PropTypes.oneOf(['center', 'left', 'right'])
};

export default Title;
