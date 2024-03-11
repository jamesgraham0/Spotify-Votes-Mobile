import React from 'react';
import renderer from 'react-test-renderer';
import RoomButton from '../../client/src/components/RoomButton';

describe('RoomButton', () => {
    it('should render the RoomButton component', () => {
        const onPress = jest.fn();
        const disabled = false;
        const buttonText = "Click me";
        const buttonStyle = { backgroundColor: "blue" };
        const textStyle = { color: "white" };

        const tree = renderer.create(
            <RoomButton
                onPress={onPress}
                disabled={disabled}
                buttonText={buttonText}
                buttonStyle={buttonStyle}
                textStyle={textStyle}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});