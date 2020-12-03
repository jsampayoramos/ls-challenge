import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../../utils/testUtils';

import Homepage from './Homepage';
import StateContexProvider from '../../context/stateContext';

const mountSetup = () => {
    return mount(
        <StateContexProvider value={{state: '', dispatch: jest.fn()}}>
            <Homepage />
        </StateContexProvider>
    );
};

test('it should render search box without errors', () => {
    const wrapper = mountSetup();
    const searchBoxComponent = findByTestAttr(wrapper, 'component-searchBox');
    expect(searchBoxComponent.length).toBe(1);
});

test('it should update state upon input box change', () => {    
    const mockSetInput = jest.fn();
    React.useState = jest.fn(() => [{type: 'input', config: {}, value: ''}, mockSetInput]);

    const wrapper = mountSetup();

    const inputBox = findByTestAttr(wrapper, 'component-input');

    inputBox.simulate("change");

    expect(mockSetInput).toHaveBeenCalled();
});