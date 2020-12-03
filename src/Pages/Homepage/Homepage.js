import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import { fetchUserInfo } from '../../utils/httpRequest';
import { StateContext } from '../../context/stateContext';

import styles from './Homepage.module.css';

const Homepage = () => {
    const [ input, setInput ] = React.useState({
        type: 'input',
        config: {
            required: true,
            placeholder: 'Type a GitHub username'
        },
        value: ''
    });
    const { state, dispatch } = React.useContext(StateContext);
    const history = useHistory();

    const onChangeInput = event => {
        setInput(prevState => {
            return {
                ...prevState,
                value: event.target.value
            };
        });
    };

    const onSubmitRequest = async event => {
        event.preventDefault();
        dispatch({ type: 'SEND_REQUEST' });
        try {
            const userInfo = await fetchUserInfo(`https://api.github.com/users/${input.value}`);
            if(userInfo.response.status !== 200) {
                const error = new Error();
                error.message = userInfo.parsedResponse.message;
                throw error;
            };
            dispatch({ type: 'GET_USERS_SUCCESS', payload: userInfo.parsedResponse} );
            
            history.push(`/userinfo/${userInfo.parsedResponse.id}`);
        } catch (err) {
            dispatch({ type: 'RESPONSE_ERROR', payload: err.message });
        };
    };

    return (
        <section className={styles.Homepage}>
            <form className={styles.SearchBox} onSubmit={onSubmitRequest} data-test="component-searchBox">
                <h4>Find a GitHub user</h4>
                <Input {...input} action={onChangeInput}/>
                {state.errorMessage ? <p>{`Error: ${state.errorMessage}`}</p> : null}
                <Button>Submit</Button>
            </form>
        </section>
    );
};

export default Homepage;