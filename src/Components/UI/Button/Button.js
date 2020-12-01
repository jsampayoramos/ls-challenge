import React from 'react';

import styles from './Button.module.css';

const button = ({children}) => {
    return (
        <button className={styles.Button}>
            {children}
        </button>
    );
};

export default button;