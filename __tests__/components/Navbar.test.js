import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from '../../client/src/components/Navbar';

describe('Navbar', () => {
    it('should render the Navbar component', () => {
        const tree = renderer.create(<Navbar />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});