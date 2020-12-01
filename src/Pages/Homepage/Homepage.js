import React, { useState } from 'react';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';

import styles from './Homepage.module.css';

const Homepage = props => {
    const [input, setInput] = useState({
        type: 'input',
        config: {
            required: true,
            placeholder: 'Type a Github username'
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
                <h4>Find a github user</h4>
                <Input {...input} action={onChangeInput}/>
                <Button>Submit</Button>
            </form>
        </section>
    );
};

export default Homepage;