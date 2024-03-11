import React from 'react';
import renderer from 'react-test-renderer';
import JoinOrCreateRoom from '../../client/src/screens/JoinOrCreateRoom';

describe('JoinOrCreateRoom', () => {
    it('should render the JoinOrCreateRoom component', () => {
        const navigation = {};
        const route = { params: { user: {} } };
        const tree = renderer.create(<JoinOrCreateRoom navigation={navigation} route={route} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});