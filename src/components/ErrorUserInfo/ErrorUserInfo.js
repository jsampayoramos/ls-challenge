import React from "react";

import Button from "../ui/Button/Button";

import styles from "./ErrorUserInfo.module.css";

const ErrorUserInfo = (props) => {
    return (
        <div className={styles.ErrorUserInfo}>
            <h4>Something went wrong</h4>
            <p>{`Error Message: ${props.errorMessage}`}</p>
            <Button action={props.action}>Back</Button>
        </div>
    );
};

export default ErrorUserInfo;
