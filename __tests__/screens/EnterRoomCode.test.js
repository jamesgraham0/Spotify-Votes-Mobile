import React from 'react';
import renderer from 'react-test-renderer';
import EnterRoomCode from '../../client/src/screens/EnterRoomCode';

describe('EnterRoomCode', () => {
    it('should render the EnterRoomCode component', () => {
        const navigation = {};
        const route = { params: { user: {} } };
        const tree = renderer.create(<EnterRoomCode navigation={navigation} route={route} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});