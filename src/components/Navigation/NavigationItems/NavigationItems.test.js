import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<NavigationItems />);
    });
    it('should render two <NavigationItem /> if user is not authenticated', () => {
        wrapper.setProps();
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItem /> if user is authenticated', () => {
        wrapper.setProps({
            loggedIn: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});