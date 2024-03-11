import React from 'react';
import renderer from 'react-test-renderer';
import TrackSearchResult from '../../client/src/components/TrackSearchResult';

describe('TrackSearchResult', () => {
    it('should render the TrackSearchResult component', () => {
        const track = {
            title: 'Test Track',
            artist: 'Test Artist',
            smallImage: 'test.jpg',
        };
        const inQueue = false;
        const tree = renderer.create(<TrackSearchResult track={track} inQueue={inQueue}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it ('should render the TrackSearchResult component with blur', () => {
        const track = {
            title: 'Test Track',
            artist: 'Test Artist',
            smallImage: 'test.jpg',
        };
        const inQueue = true;
        const tree = renderer.create(<TrackSearchResult track={track} inQueue={inQueue}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});