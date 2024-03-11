import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../client/src/components/Header';

describe('Header', () => {
    it('should render the Header component', () => {
        const tree = renderer.create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});