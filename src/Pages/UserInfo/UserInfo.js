import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import RepoItem from '../../Components/RepoItem/RepoItem';

import styles from './UserInfo.module.css';

const UserInfo = props => {
    const history = useHistory();
    
    const {avatar_url, name, public_repos } = props.user;
    
    const reposElements = props.repos.map(repo => <RepoItem key={repo.name}>{repo.name}</RepoItem>);
    
    return (
        <section className={styles.UserInfo}>
            <div className={styles.UserInfoContainer}>
                <div className={styles.AvatarContainer}>
                    <div>
                        <span onClick={() => history.push('/')}>Back</span>
                    </div>
                    <img src={avatar_url} alt='avatar' />
                </div>
                <div className={styles.UserInfoDetails}>
                    <h4>{name || '[user with no name]'}</h4>
                    <hr/>
                    <p>{`${public_repos} public repos`}</p>
                    <ul>
                        {reposElements}
                    </ul>
                </div>
            </div>
        </section>
    );
};

UserInfo.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default UserInfo;