import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Search from '../../client/src/components/Search';

describe('Search', () => {
    it('should render the Search component', () => {
        const room = {
            id: '1',
            name: 'Test Room',
            queue: [],
            users: [],
        };
        const user = {
            id: '1',
            name: 'Test User',
            product: 'premium',
        };
        const { getByPlaceholderText } = render(<Search room={room} user={user} />);
        
        // Test search input
        const searchInput = getByPlaceholderText('Search...');
        fireEvent.changeText(searchInput, 'test');
        expect(searchInput.props.value).toBe('test');
    });

    it('should render the Search component with disabled search input', () => {
        const room = {
            id: '1',
            name: 'Test Room',
            queue: [],
            users: [],
        };
        const user = {
            id: '1',
            name: 'Test User',
            product: 'free',
        };
        const { getByPlaceholderText } = render(<Search room={room} user={user} />);
        
        // Test search input
        const disabledSearchInput = getByPlaceholderText('Need premium account to search');
        expect(disabledSearchInput.props.value).toBeUndefined();
    });
});