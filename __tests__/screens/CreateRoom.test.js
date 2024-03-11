import React from 'react';
import renderer from 'react-test-renderer';
import CreateRoom from '../../client/src/screens/CreateRoom';

describe('CreateRoom', () => {
    it('should render the CreateRoom component', () => {
        const navigation = {};
        const route = { params: { user: {} } };
        const tree = renderer.create(<CreateRoom navigation={navigation} route={route} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});