import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BurgerBuilder from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Wrapper from '../../hoc/Wrapper/Wrapper';

configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<BurgerBuilder />);
    });
    it('should render one <BuildControls /> if ingredients are loaded', () => {
        wrapper.setProps({
            loaded: true,
            error: false
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
    it('should not render <BuildControls /> if ingredients are not loaded', () => {
        wrapper.setProps({
            loaded: false,
            error: false
        });
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
    it('should not render <BuildControls /> if there is an error', () => {
        wrapper.setProps({
            loaded: true,
            error: true
        });
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});