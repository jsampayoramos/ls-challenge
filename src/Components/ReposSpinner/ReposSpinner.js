import React from 'react';

import PropTypes from 'prop-types';

import styles from './ReposSpinner.module.css';

const reposSpinner = ({ style }) => {
    return (
        <div className={styles.SpinnerContainer} style={style}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

reposSpinner.propTypes = {
    style: PropTypes.object
};

export default reposSpinner;