import React from 'react';

import Proptypes from 'prop-types';

import styles from './Input.module.css';

const Input = props => {
    switch (props.type) {
        case 'input':
            return <input className={styles.Input} {...props.config} value={props.value} onChange={props.action} data-test="component-input"/>
        default: return null;
    };
};

Input.propTypes = {
    config: Proptypes.object.isRequired,
    value: Proptypes.string.isRequired,
    action: Proptypes.func.isRequired
}

export default Input;