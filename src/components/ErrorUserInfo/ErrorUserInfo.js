import React from "react";

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

export default ErrorUserInfo;
