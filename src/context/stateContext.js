import React from 'react';

export const StateContext = React.createContext(null);

const initialState = {
    user: {
        data: null,
        errorMessage: '',
        loading: false
    },
    repos: {
        data: [],
        errorMessage: '',
        loading: false
    }
};
  
const reducer = (state, action) => {
    switch(action.type) {
        case 'SEND_USER_INFO_REQUEST':
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true
                }
            };
        case 'GET_USER_INFO_SUCCESS':
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload,
                    loading: false,
                }
            };
        case 'SEND_USER_REPOS_REQUEST':
            return {
                ...state,
                repos: {
                    ...state.repos,
                    loading: true
                }
            };
        case 'GET_USER_REPOS_SUCCESS':
            return {
                ...state,
                repos: {
                    ...state.repos,
                    data: action.payload,
                    loading: false
                }
            };
        case 'GET_USER_ERROR':
            return {
                ...state,
                user: {
                    ...state.user,
                    errorMessage: action.payload,
                    loading: false
                }
            };
        case 'GET_USER_REPOS_ERROR':
            return {
                ...state,
                repos: {
                    ...state.repos,
                    errorMessage: action.payload,
                    loading: false
                }
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