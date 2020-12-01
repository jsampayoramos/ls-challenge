import React from 'react';

import styles from './RepoItem.module.css';

const repoItem = ({children}) => {
    return (
        <li className={styles.RepoItem}>{children}</li>
    );
};

export default repoItem;