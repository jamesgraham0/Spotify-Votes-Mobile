import React from 'react';
import renderer from 'react-test-renderer';
import BackgroundCircles2 from '../../client/src/components/BackgroundCircles2';

describe('BackgroundCircles2', () => {
    it('should render the BackgroundCircles2 component', () => {
        const tree = renderer.create(<BackgroundCircles2 />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});