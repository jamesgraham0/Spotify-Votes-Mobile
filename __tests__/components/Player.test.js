import React from 'react';
import renderer from 'react-test-renderer';
import Player from '../../client/src/components/Player';

describe('Player', () => {
    it('should render the Player component', () => {
        user = {
            id: 1,
            name: "John",
            email: "",
            image: "",
        }
        room = {
            id: 1,
            name: "Room",
            code: "1234",
            host: user,
            users: [user],
            queue: [],
            playing: false,
            currentSong: null,
            votes: [],
        }
        const tree = renderer.create(<Player user={user} room={room}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});