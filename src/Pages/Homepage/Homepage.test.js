import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr } from '../../utils/testUtils';

import Homepage from './Homepage';
import Input from '../../Components/UI/Input/Input';

const shallowSetup = () => {
    const mockGetUser = jest.fn()
    return shallow(<Homepage getUser={mockGetUser} />);
};

const mountSetup = () => {
    const mockGetUser = jest.fn()
    return mount(
        <Homepage getUser={mockGetUser} />
    );
};

test('Search box renders withouts errors', () => {
    const wrapper = shallowSetup();
    const searchBoxComponent = findByTestAttr(wrapper, 'component-searchBox');
    expect(searchBoxComponent.length).toBe(1);
});

test('State updates with input box upon change', () => {    
    const mockSetInput = jest.fn();
    React.useState = jest.fn(() => [{type: 'input'}, mockSetInput]);

    const wrapper = mountSetup();

    const inputBox = findByTestAttr(wrapper, 'component-input');

    inputBox.simulate("change");

    expect(mockSetInput).toHaveBeenCalled();
});