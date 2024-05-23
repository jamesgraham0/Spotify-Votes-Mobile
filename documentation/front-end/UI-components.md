# UI Components

- **Components**
    
    ### Header
    
    - Called from **CreateRoom** and **EnterRoomCode**
    - Displays a header bar at the top of the screen.
    - Shows a title text in the center of the header bar.
    - Includes a back button on the left side of the header bar.
    - The title text is customizable and passed in as a prop (`headerText`).
    - The back button triggers a function when pressed, which is also passed in as a prop (`onBackPress`).
    
    ### Navbar
    
    - Called from **Room**
    - Serves as a navigation bar at the bottom of the screen.
    - Contains three main sections: `Playing`, `Search`, and `Queue`.
    - The `Playing` section shows the currently playing track.
    - The `Search` section allows users to search for music.
    - The `Queue` section displays the list of tracks that are queued up to play next.
    - Listens for two events: `addedTrackToQueue` and `addedFirstTrack`.
    
    ### Player
    
    - Called from **Playing**
    - Represents a music player that plays tracks based on events received from a socket connection.
    - Maintains a state for whether a track is currently playing and what track is currently playing.
    - Listens for socket events to add the first track, play the next track, and synchronize the currently playing track when a user joins the room.
    
    ### Playing
    
    - Called from **Navbar**
    - Serves as a container for the `Player` component.
    - Receives `user` and `room` as props and passes them to the `Player` component.
    - Styles and positions the `Player` component within a view that takes up the full width and height of the container.
    
    ### PulsingButton
    
    - Called from **Landing**
    - Represents a button that continuously pulses (scales up and down) to draw user attention.
    - Uses React Native's `Animated` API to create the pulsing effect.
    
    ### Queue
    
    - Called from **Navbar**
    - Represents a queue of tracks to be played in a specific room.
    - Listens for socket events to update the queue when a track is added, a track starts playing, a vote is cast, or a user joins the room.
    - Starts a countdown when the `startCountdownForNextTrack` event is received.
    
    ### QueueTrack
    
    - Called from **Queue**
    - Represents a single track in the queue, displaying the track's image, title, artist, and the number of votes it has received.
    - Allows users to vote for the track by pressing on it, emitting a 'vote' event to the server with the track, room ID, and user information.
    - Uses haptic feedback to provide a physical response when a user votes for a track.
    
    ### RoomButton
    
    - Called from **CreateRoom** and **JoinOrCreateRoom**
    - Represents a customizable button used for various actions within a room.
    - Triggers haptic feedback and a provided `onPress` function when the button is pressed.
    - Displays a provided text (`buttonText`) and can be styled with custom button and text styles (`buttonStyle` and `textStyle`).
    
    ### Search
    
    - Called from **Navbar**
    - Represents a search interface that allows users to search for tracks and add them to the room's queue.
    - Maintains a state for the search input, the search results, and the current queue.
    - Listens for socket events to update the queue when a track is added, a track starts playing, or a user joins the room.
    
    ### TrackSearchResult
    
    - Called from **Search**
    - Represents a single search result in the form of a track, displaying the track's image, title, and artist.
    - Indicates whether the track is already in the queue by overlaying a blur view with the text "Added to queue".
    - Receives the track and a boolean `inQueue` as props, and conditionally renders the blur view based on the `inQueue` prop.
    
    ### UsersVoted
    
    - Called from **QueueTrack**
    - Displays a list of users who have voted for a specific track.
    - Allows the user to open a modal to view the full list of users who have voted.
    - Each user in the list is represented with their display name and profile image.
    
    ### BackgroundCircles
    
    - Called from **Landing** and **JoinOrCreateRoom**
    - A dynamic, abstract background pattern composed of overlapping, semi-transparent circles of two different colours. The dark circles are used to guide the users eyes to the instruction text.
    
    ### BackgroundCircles2
    
    - Called from **CreateRoom** and **JoinRoom**
    - A dynamic, abstract background pattern composed of overlapping, semi-transparent circles of two different colours. The dark circles are used to guide the users eyes to the instruction text.
    
- **Screens**
    
    ### CreateRoom
    
    - Represents a screen where users can create a new room by entering a room name.
    - Maintains a state for the room name and updates it as the user types in the `TextInput`.
    - Contains a function `createNewRoom` that creates a new room object with the room name, host ID, a default code, a unique ID, the device ID, and an array of users that initially contains only the user who created the room.
    
    ### EnterRoomCode
    
    - Represents a screen where users can enter a room code to join an existing room.
    - Maintains a state for the room code and updates it as the user types in the `TextInput`.
    - Contains a function `validateCodeAndJoinRoom` that checks if the entered code corresponds to an existing room and, if so, emits a 'joinRoom' event to the server and navigates the user to the room.
    
    ### JoinOrCreateRoom
    
    - Represents a screen where users can choose to either create a new room or join an existing room.
    - Receives the user's information as a prop and uses it to display a personalized greeting and to determine whether the user has a premium Spotify account.
    - Contains two buttons, one for creating a room and one for joining a room, which navigate to the respective screens when pressed. The create room button is disabled if the user does not have a premium Spotify account.
    
    ### Landing
    
    - Represents the landing screen where users can log in with their Spotify account.
    - Uses the `useAuthRequest` hook from `expo-auth-session` to handle the OAuth2 authorization process with Spotify.
    - Contains a `PulsingButton` that, when pressed, prompts the Spotify login process.
    
    ### Room
    
    - Represents a room where users can listen to music together.
    - Maintains a state for the room, whether a new person has joined the room, whether the user modal is visible, the room code, and some animation values.
    - Listens for socket events to update the room state when a new user joins the room or when the user joins a room.
- **Utils**
    
    ### constants
    
    - Holds all of the constants for the app (excluding environment variables). At the moment, the EXPO_IP needs to be updated based on what network the expo simulator is running on.
    - Constants for styles
    
    ### service
    
    - Handles all of the API calls to Spotify
    
    ### socket
    
    - The socket connection for the front end. Used to send bi-directional information between client/server.
    - Configures the socket to use the WebSocket transport and disables JSONP polling.
    - Listens for the "connect" event and logs the socket ID when a connection is established.