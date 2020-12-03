import React from 'react';

import Proptypes from 'prop-types';

import styles from './Button.module.css';

const button = ({children}) => {
    return (
        <button className={styles.Button} data-test="component-button">
            {children}
        </button>
    );
};

button.propTypes = {
    children: Proptypes.string.isRequired
}

export default button;