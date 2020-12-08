import React from "react";

import Proptypes from "prop-types";

import styles from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            onClick={props.action}
            className={styles.Button}
            data-test="component-button"
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    children: Proptypes.string.isRequired,
};

export default Button;
