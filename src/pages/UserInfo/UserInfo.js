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
    const history = useHistory();
    
    const {avatar_url, name, public_repos, repos_url } = state.user.data;

    React.useEffect(() => {
        // Set the number of pages of the pagination
        if(public_repos > 30) {
            setTotalPages(Math.ceil(public_repos / 30));
        };
    }, [public_repos]);

    const getUserRepos = React.useCallback(async () => {
        dispatch({ type: 'SEND_USER_REPOS_REQUEST' });
        try {
            const userRepos = await fetchUserRepos(repos_url, currentPage);
            if(userRepos.response.status !== 200) {
                const error = new Error();
                error.message = userRepos.parsedResponse.message;
                throw error;
            };
            dispatch({ type: 'GET_USER_REPOS_SUCCESS', payload: userRepos.parsedResponse} );
        } catch (err) {
            dispatch({ type: 'GET_USER_REPOS_ERROR', payload: err.message });
        };

    }, [currentPage, dispatch, repos_url]);

    React.useEffect(() => {
        //Request repos github api when the current page changes
        getUserRepos();
    }, [getUserRepos, dispatch]);

    const onChangePageNumber = (event, type) => {
        event.preventDefault();
        setCurrentPage(prevPage => type === 'incr' ? prevPage + 1 : prevPage - 1);
    };
    
    let reposElements = state.repos.data.map(repo => <RepoItem key={repo.name}>{repo.name}</RepoItem>);
    
    if(state.repos.errorMessage) reposElements = <p style={{color: 'red'}}>{`Error: ${state.repos.errorMessage}`}</p>

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
                    {state.repos.loading ? <ReposSpinner style={totalPages > 1 ? {height: `290px`} : null} /> : <ul>{reposElements}</ul>}
                    <Pagination page={currentPage} totalPages={totalPages} changePage={onChangePageNumber} />
                </div>
            </div>
        </section>
    );
};

export default UserInfo;