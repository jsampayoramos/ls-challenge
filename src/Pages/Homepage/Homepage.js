import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';

import styles from './Homepage.module.css';

const Homepage = props => {
    const [input, setInput] = useState({
        type: 'input',
        config: {
            required: true,
            placeholder: 'Type a GitHub username'
        },
        value: ''
    });
    
    const onChangeInput = event => {
        setInput(prevState => {
            return {
                ...prevState,
                value: event.target.value
            };
        });
    };

    return (
        <section className={styles.Homepage}>
            <form className={styles.SearchBox} onSubmit={(event) => props.getUser(event, input.value)}>
                <h4>Find a GitHub user</h4>
                <Input {...input} action={onChangeInput}/>
                {props.error ? <p>{`Error: ${props.error}`}</p> : null}
                <Button>Submit</Button>
            </form>
        </section>
    );
};

Homepage.propTypes = {
    getUser: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default Homepage;