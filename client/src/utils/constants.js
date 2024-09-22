const Constants = {
    EXPO_IP: '192.168.2.67', // TODO: For development purposes this needs to be updated to match the IP of expo go after each update
    BACKEND_PORT: '4000',
    EXPO_PORT: '19000',
    SPOTIFY_URL: 'https://open.spotify.com',
    APP_SCHEME: 'exp',
    DEVICE_ID_LENGTH: 40,
    DEFAULT_PROFILE_IMAGE: "http://www.gravatar.com/avatar/?d=mp",
    SPOTIFY_GREEN: '#1DB954',
    SPOTIFY_PURPLE: '#B026FF',
    SPOTIFY_BLACK: '#191414',
    HEADER_STYLES: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '13%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
    },
    INSTRUCTION_TEXT_STYLES: {
        color: '#BBB',
        fontSize: 22,
        marginHorizontal: 60,
        marginTop: 220,
        marginBottom: 10,
    },
    TEXT_INPUT_STYLES: {
        marginTop: 10,
        padding: 10,
        width: 300,
        fontSize: 24,
        color: '#fff',
        backgroundColor: '#101010',
        borderStartColor: '#B026FF',
        borderStartWidth: 1,
        borderBottomColor: '#B026FF',
        borderBottomWidth: 2,
        borderBottomEndRadius: 100,
    },
};

export default Constants;