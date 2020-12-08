import React from "react";
import PropTypes from "prop-types";

import Button from "../ui/Button/Button";

import styles from "./ErrorUserInfo.module.css";

const ErrorUserInfo = (props) => {
    return (
        <div className={styles.ErrorUserInfoContainer}>
            <div className={styles.ErrorUserInfo}>
                <h4>Something went wrong</h4>
                <p>{`Error message: ${props.errorMessage}`}</p>
                <Button action={props.action}>Back</Button>
            </div>
        </div>
    );
};

ErrorUserInfo.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
};

export default ErrorUserInfo;
