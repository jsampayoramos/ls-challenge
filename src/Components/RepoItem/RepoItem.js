import React from 'react';

import PropTypes from 'prop-types';

import styles from './RepoItem.module.css';

const RepoItem = ({children}) => {
    return (
        <li className={styles.RepoItem}>{children}</li>
    );
};

RepoItem.propTypes = {
    children: PropTypes.string
};

export default RepoItem;