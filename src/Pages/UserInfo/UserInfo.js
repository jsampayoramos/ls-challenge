import React from 'react';
import { useHistory } from 'react-router-dom';

import RepoItem from '../../components/RepoItem/RepoItem';
import { StateContext } from '../../context/stateContext';
import Pagination from '../../components/ui/Pagination/Pagination';
import { fetchUserRepos } from '../../utils/httpRequest';
import ReposSpinner from '../../components/ReposSpinner/ReposSpinner';

import styles from './UserInfo.module.css';

const UserInfo = () => {
    const { state, dispatch } = React.useContext(StateContext);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [loadingRepos, setLoadingRepos] = React.useState(false);
    const history = useHistory();
    
    const {avatar_url, name, public_repos } = state.userInfo;

    React.useEffect(() => {
        // Set the number of pages of the pagination
        if(public_repos > 30) {
            setTotalPages(Math.ceil(public_repos / 30));
        };
    }, [public_repos]);

    const getUserRepos = React.useCallback(async () => {
        setLoadingRepos(true);
        try {
            const userRepos = await fetchUserRepos(state.userInfo.repos_url, currentPage);
            if(userRepos.response.status !== 200) {
                const error = new Error();
                error.message = userRepos.parsedResponse.message;
                throw error;
            };
            dispatch({ type: 'GET_REPOS_SUCCESS', payload: userRepos.parsedResponse} );
            setLoadingRepos(false);
        } catch (err) {
            dispatch({ type: 'RESPONSE_ERROR', payload: err.message });
            setLoadingRepos(false);
        };

    }, [currentPage, dispatch, state.userInfo.repos_url]);

    React.useEffect(() => {
        //Request repos github api when the current page changes
        getUserRepos();
    }, [getUserRepos, dispatch]);

    const onChangePageNumber = (event, type) => {
        event.preventDefault();
        setCurrentPage(prevPage => type === 'incr' ? prevPage + 1 : prevPage - 1);
    };
    
    let reposElements = state.userRepos.map(repo => <RepoItem key={repo.name}>{repo.name}</RepoItem>);
    
    if(reposElements.length === 0) reposElements = <p>(User without public repos!)</p>;

    const onBack = () => {
        dispatch({ type: 'INITIALIZE_STATE' });
        history.push('/');
    }

    return (
        <section className={styles.UserInfo}>
            <div className={styles.UserInfoContainer}>
                <div className={styles.AvatarContainer}>
                    <div>
                        <span onClick={onBack}>Back</span>
                    </div>
                    <img src={avatar_url} alt='avatar' />
                </div>
                <div className={styles.UserInfoDetails}>
                    <h4>{name || '[user with no name]'}</h4>
                    <hr/>
                    <p>{`${public_repos} public repos`}</p>
                    {loadingRepos ? <ReposSpinner style={totalPages > 1 ? {minHeight: '290px'} : null} /> : <ul>{reposElements}</ul>}
                    <Pagination page={currentPage} totalPages={totalPages} changePage={onChangePageNumber} />
                </div>
            </div>
        </section>
    );
};

export default UserInfo;