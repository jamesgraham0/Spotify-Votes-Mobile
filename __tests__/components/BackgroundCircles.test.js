import React from 'react';
import renderer from 'react-test-renderer';
import BackgroundCircles from '../../client/src/components/BackgroundCircles';

describe('BackgroundCircles', () => {
    it('should render the BackgroundCircles component', () => {
        const tree = renderer.create(<BackgroundCircles />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
