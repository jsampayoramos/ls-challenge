import React from 'react';

import styles from './Spinner.module.css';

const spinner = () => {
    return (
        <div className={styles.Modal}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default spinner;