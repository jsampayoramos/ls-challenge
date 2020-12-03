import React from 'react';

import styles from './Layout.module.css';

const Layout = ({children}) => {
    return (
        <div className={styles.Layout}>
            <header>
                <div>
                    <h2>GitFinder</h2>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;