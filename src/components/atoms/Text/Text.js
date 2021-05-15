import React from 'react';
import PropTypes from 'prop-types';
import classes from './text.module.scss';
const Text = ({spacing,size,italics,ellipsis,weight,children,theme,align,capitalize,noMargin,...rest}) => {
    return (
        <p
            {...rest}
            className={`${classes.text} ${spacing ? classes[spacing] : ' '} 
            ${size ? `${classes['font'+size]}` : ` ${classes.fontsm}`}
            ${theme ?
                classes[theme]:'dark'} ${align ? classes[align] : ''} ${
                capitalize ? classes.capitalize : ''
            } ${italics? classes.italics.toString():''} ${ellipsis? classes.ellipsis.toString():''} `}
            style={{ fontWeight: weight, margin: noMargin ? '0' : '' }} >
            {children}
        </p>
    );
};

Text.defaultProps = {
    children: '',
};

Text.propTypes = {
    children: PropTypes.any.isRequired,
    spacing: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'none']),
    align: PropTypes.oneOf(['left', 'right', 'center']),
    theme: PropTypes.oneOf(['red', 'light', 'dark','gray','green','lightgray']),
    size: PropTypes.oneOf(['xs','sm', 'md', 'lg']),
    italics: PropTypes.bool,
    capitalize: PropTypes.bool,
    weight: PropTypes.string,
    ellipsis: PropTypes.bool
};

export default Text;
