import React from 'react';
import renderer from 'react-test-renderer';
import Playing from '../../client/src/components/Playing';

describe('Playing', () => {
    it('should render the Playing component', () => {
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
        const tree = renderer.create(<Playing user={user} room={room}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});