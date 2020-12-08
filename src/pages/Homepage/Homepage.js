import React from "react";
import { useHistory } from "react-router-dom";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import { StateContext } from "../../context/stateContext";

import styles from "./Homepage.module.css";

const Homepage = () => {
    const [input, setInput] = React.useState({
        type: "input",
        config: {
            required: true,
            placeholder: "Type a GitHub username",
        },
        value: "",
    });
    const { state, dispatch } = React.useContext(StateContext);
    const history = useHistory();

    const onChangeInput = (event) => {
        setInput((prevState) => {
            return {
                ...prevState,
                value: event.target.value,
            };
        });
    };

    const onSubmitUserInfoRequest = async (event) => {
        event.preventDefault();
        dispatch({ type: "SEND_USER_INFO_REQUEST" });
        history.push(`/userinfo/${input.value}`);
    };

    return (
        <section className={styles.Homepage}>
            <form
                className={styles.SearchBox}
                onSubmit={onSubmitUserInfoRequest}
                data-test="component-searchBox"
            >
                <h4>Find a GitHub user</h4>
                <Input {...input} action={onChangeInput} />
                {state.user.errorMessage ? (
                    <p>{`Error: ${state.user.errorMessage}`}</p>
                ) : null}
                <Button>Submit</Button>
            </form>
        </section>
    );
};

export default Homepage;
