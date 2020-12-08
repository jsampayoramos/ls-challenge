import React from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import { StateContext } from "../../context/stateContext";
import ErrorUserInfo from "../../components/ErrorUserInfo/ErrorUserInfo";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";

import styles from "./UserInfo.module.css";

const UserInfo = () => {
    const { state, dispatch } = React.useContext(StateContext);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const history = useHistory();
    const { username } = useParams();

    const { public_repos, repos_url } = state.user.data;

    //Get user information from GitHub API
    const getUserInfo = React.useCallback(async () => {
        try {
            const user = await axios(
                `https://api.github.com/users/${username}`
            );
            dispatch({
                type: "GET_USER_INFO_SUCCESS",
                payload: user.data,
            });
        } catch (err) {
            dispatch({
                type: "GET_USER_ERROR",
                payload: err.response.data.message,
            });
        }
    }, [dispatch, username]);

    React.useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    //Get user repositories
    const getUserRepos = React.useCallback(async () => {
        if (repos_url) {
            dispatch({ type: "SEND_USER_REPOS_REQUEST" });
            try {
                const userRepos = await axios(
                    `${repos_url}?page=${currentPage}`
                );
                dispatch({
                    type: "GET_USER_REPOS_SUCCESS",
                    payload: userRepos.data,
                });
            } catch (err) {
                dispatch({
                    type: "GET_USER_REPOS_ERROR",
                    payload: err.response.data.message,
                });
            }
        }
    }, [currentPage, dispatch, repos_url]);

    React.useEffect(() => {
        getUserRepos();
    }, [getUserRepos, dispatch]);

    //Define the total number of pages
    React.useEffect(() => {
        if (public_repos > 30) {
            setTotalPages(Math.ceil(public_repos / 30));
        }
    }, [public_repos]);

    const onChangePageNumber = (event, type) => {
        event.preventDefault();
        setCurrentPage((prevPage) =>
            type === "incr" ? prevPage + 1 : prevPage - 1
        );
    };

    const onBack = () => {
        dispatch({ type: "INITIALIZE_STATE" });
        history.push("/");
    };

    return (
        <section className={styles.UserInfo}>
            {state.user.errorMessage ? (
                <ErrorUserInfo
                    action={onBack}
                    errorMessage={state.user.errorMessage}
                />
            ) : null}
            {Object.keys(state.user.data).length !== 0 ? (
                <UserInfoCard
                    {...state.user.data}
                    onBack={onBack}
                    repos={state.repos.data}
                    reposLoading={state.repos.loading}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onChangePageNumber={onChangePageNumber}
                    reposError={state.repos.errorMessage}
                />
            ) : null}
        </section>
    );
};

export default UserInfo;
