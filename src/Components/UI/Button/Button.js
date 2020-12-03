import React from 'react';

import Proptypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({children}) => {
    return (
        <button className={styles.Button} data-test="component-button">
            {children}
        </button>
    );
};

Button.propTypes = {
    children: Proptypes.string.isRequired
}

export default Button;