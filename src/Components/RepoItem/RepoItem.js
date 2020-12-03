import React from 'react';

import PropTypes from 'prop-types';

import styles from './RepoItem.module.css';

const repoItem = ({children}) => {
    return (
        <li className={styles.RepoItem}>{children}</li>
    );
};

repoItem.propTypes = {
    children: PropTypes.string
};

export default repoItem;