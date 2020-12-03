import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr } from '../../utils/testUtils';

import Homepage from './Homepage';
import Input from '../../components/UI/Input/Input';
import StateContexProvider from '../../context/stateContext';

const mountSetup = () => {
    return mount(
        <StateContexProvider value={{state: '', dispatch: jest.fn()}}>
            <Homepage />
        </StateContexProvider>
    );
};

test('Search box renders withouts errors', () => {
    const wrapper = mountSetup();
    const searchBoxComponent = findByTestAttr(wrapper, 'component-searchBox');
    expect(searchBoxComponent.length).toBe(1);
});

test('State updates with input box upon change', () => {    
    const mockSetInput = jest.fn();
    React.useState = jest.fn(() => [{type: 'input', config: {}, value: ''}, mockSetInput]);

    const wrapper = mountSetup();

    const inputBox = findByTestAttr(wrapper, 'component-input');

    inputBox.simulate("change");

    expect(mockSetInput).toHaveBeenCalled();
});