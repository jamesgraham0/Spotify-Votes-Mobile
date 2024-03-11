import React from 'react';
import renderer from 'react-test-renderer';
import UsersVoted from '../../client/src/components/UsersVoted';

describe('UsersVoted', () => {
    it('should render the UsersVoted component', () => {
        const track = {
            uri: 'test',
            usersVoted: [
                {
                    id: 1,
                    display_name: 'test',
                    images: [{ url: 'test' }],
                },
            ],
        }
        const tree = renderer.create(<UsersVoted track={track}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should render the UsersVoted component with multiple users', () => {
        const track = {
            uri: 'test',
            usersVoted: [
                {
                    id: 1,
                    display_name: 'test',
                    images: [{ url: 'test' }],
                },
                {
                    id: 2,
                    display_name: 'test',
                    images: [{ url: 'test' }],
                },
            ],
        }
        const tree = renderer.create(<UsersVoted track={track}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});