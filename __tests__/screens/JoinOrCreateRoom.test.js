import React from 'react';
import renderer from 'react-test-renderer';
import LocalRoom from '../../client/src/screens/LocalRoom';

describe('LocalRoom', () => {
    it('should render the LocalRoom component', () => {
        const navigation = {};
        const route = { params: { user: {} } };
        const tree = renderer.create(<LocalRoom navigation={navigation} route={route} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});