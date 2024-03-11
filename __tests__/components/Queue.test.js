import React from 'react';
import renderer from 'react-test-renderer';
import Queue from '../../client/src/components/Queue';

describe('Queue', () => {
    it('should render the Queue component', () => {
        const queue = [];
        const roomId = 1;
        const user = {
            id: 1,
            name: "John",
            email: "",
            image: "",
        }
        const tree = renderer.create(<Queue queue={queue} roomId={roomId} user={user} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});