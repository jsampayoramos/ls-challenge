import React from "react";

import ReposSpinner from "../../components/ReposSpinner/ReposSpinner";
import Pagination from "../../components/ui/Pagination/Pagination";
import RepoItem from "../RepoItem/RepoItem";

import styles from "./UserInfoCard.module.css";

const UserInfoCard = (props) => {
    const {
        avatar_url = null,
        name = null,
        public_repos = null,
        onBack,
        repos,
        reposLoading,
        totalPages,
        currentPage,
        onChangePageNumber,
    } = props;

    const reposElements = repos.map((repo) => (
        <RepoItem key={repo.name}>{repo.name}</RepoItem>
    ));

    return (
        <div className={styles.UserInfoContainer}>
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

export default UserInfoCard;
