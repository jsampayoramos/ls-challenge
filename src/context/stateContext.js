import React from 'react';

export const StateContext = React.createContext(null);

const initialState = {
    userInfo: null,
    userRepos: [],
    loading: false,
    errorMessage: ''
};
  
const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_USERS_SUCCESS':
        return {
            ...state,
            userInfo: action.payload,
            errorMessage: ''
        };
        case 'GET_REPOS_SUCCESS':
        return {
            ...state,
            userRepos: action.payload,
            loading: false
        }
        case 'SEND_REQUEST':
        return {
            ...state,
            loading: true
        };
        case 'RESPONSE_ERROR':
        return {
            ...state,
            errorMessage: action.payload,
            loading: false
        };
        case 'INITIALIZE_STATE': return initialState;
        default: return state;
    };
};

const StateContextProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    return (
        <StateContext.Provider value={{state, dispatch}}>
            {children}
        </StateContext.Provider>
    );
};

export default StateContextProvider;