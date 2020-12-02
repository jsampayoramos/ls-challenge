import React from 'react';

import styles from './Input.module.css';

const input = props => {
    switch (props.type) {
        case 'input':
            return <input className={styles.Input} {...props.config} value={props.value} onChange={props.action} data-test="component-input"/>
        default: return null;
    };
};

export default input;