import React from 'react';

import RepoItem from '../../Components/RepoItem/RepoItem';

import styles from './UserInfo.module.css';

const userInfo = props => {
    const {avatar_url, name, public_repos } = props.user;
    
    const reposElements = props.repos.map(repo => <RepoItem>{repo.name}</RepoItem>)
    console.log(props.repos)
    return (
        <section className={styles.UserInfo}>
            <div className={styles.UserInfoContainer}>
                <div className={styles.AvatarContainer}>
                    <img src={avatar_url} alt='avatar' />
                </div>
                <div className={styles.UserInfoDetails}>
                    <h4>{name}</h4>
                    <hr/>
                    <p>{`${public_repos} public repos:`}</p>
                    <ul>
                        {reposElements}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default userInfo;