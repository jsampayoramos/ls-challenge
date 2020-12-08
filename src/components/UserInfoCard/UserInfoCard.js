import React from "react";
import PropTypes from "prop-types";

import ReposSpinner from "../../components/ReposSpinner/ReposSpinner";
import Pagination from "../../components/ui/Pagination/Pagination";
import RepoItem from "../RepoItem/RepoItem";

import styles from "./UserInfoCard.module.css";

const UserInfoCard = (props) => {
    const {
        avatar_url,
        name,
        public_repos,
        onBack,
        repos,
        reposLoading,
        totalPages,
        currentPage,
        onChangePageNumber,
        reposError,
    } = props;

    let reposElements = repos.map((repo) => (
        <RepoItem key={repo.name}>{repo.name}</RepoItem>
    ));

    if (reposError) {
        reposElements = (
            <p
                className={styles.ReposErrorMessage}
            >{`Error message: ${reposError}`}</p>
        );
    }

    return (
        <div className={styles.UserInfoCard}>
            <div className={styles.AvatarContainer}>
                <div>
                    <span onClick={onBack}>Back</span>
                </div>
                <img src={avatar_url} alt="avatar" />
            </div>
            <div className={styles.UserInfoDetails}>
                <h4>{name || "[user with no name]"}</h4>
                <hr />
                <p>{`${public_repos} public repos`}</p>
                {reposLoading ? (
                    <ReposSpinner
                        style={totalPages > 1 ? { height: `290px` } : null}
                    />
                ) : (
                    <ul>{reposElements}</ul>
                )}
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    changePage={onChangePageNumber}
                />
            </div>
        </div>
    );
};

UserInfoCard.propTypes = {
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    public_repos: PropTypes.number,
    onBack: PropTypes.func,
    repos: PropTypes.array,
    reposLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    onChangePageNumber: PropTypes.func,
    reposError: PropTypes.string,
};

export default UserInfoCard;
