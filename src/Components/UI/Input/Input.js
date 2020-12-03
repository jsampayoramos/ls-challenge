import React from 'react';

import Proptypes from 'prop-types';

import styles from './Input.module.css';

const input = props => {
    switch (props.type) {
        case 'input':
            return <input className={styles.Input} {...props.config} value={props.value} onChange={props.action} data-test="component-input"/>
        default: return null;
    };
};

input.propTypes = {
    config: Proptypes.object.isRequired,
    value: Proptypes.string.isRequired,
    action: Proptypes.func.isRequired
}

export default input;