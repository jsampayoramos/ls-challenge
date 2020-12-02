import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from './utils/testUtils';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const mockDispatch = jest.fn();

const setup = () => {
    const mockUseReducer = jest.fn().mockReturnValue(['', mockDispatch]);

    React.useReducer = mockUseReducer;

    return mount(<BrowserRouter><App /></BrowserRouter>)
};

test('Submit button dispatches useReducer action with type LOADING', () => {
    const wrapper = setup();
    const formComponent = findByTestAttr(wrapper, 'component-searchBox');

    formComponent.simulate('submit');

    expect(mockDispatch).toHaveBeenCalledWith({type: 'LOADING'});
});