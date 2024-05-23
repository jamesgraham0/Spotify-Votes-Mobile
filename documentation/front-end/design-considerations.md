# Design Considerations

### General design considerations

1. **Spotify** - Available for both iOS and Android, already the most established music streaming platform, highly available and diverse set of API endpoints. 
2. **Monolith Repository** - The project will use a monolithic repository structure. This means that all the codebase, including frontend and backend code, is stored in one single repository. This aids in easy code sharing, testing, and deployment as every part of the project is interconnected and can be managed from a single place.
3. **User Authentication** - Using Spotify’s OAuth2.0 workflow grants the app access to certain profile data, and using their access_token, can make API calls on their behalf to control the app.
4. **Connectivity and Data Passing** - Using sockets, the app creates a bi-directional connection stream from the server to the client. With this model, we can quickly broadcast changes to specific users (I.e notify everyone in only the room “James’ Party” that someone new has entered, except for Ben of course). This is especially noticeable when adding to, and voting on tracks, in the queue.
5. **Limited Backend** - The choice to not use a database is simply because I don’t need to store data. Nothing in the app needs to persist once closed.
6. **Host Privileges** - The design should grant the host the ability to play/pause music, remove people from the room, and forcibly change a track. It also allows the host to delete the room completely, kicking everyone in the process.
7. **Tech Stack:**
    1. **React Native** - Well established library of modules and packages. Easily transferred from React. Converts components to their native versions, which is important for this app.
    2. **Express** - Minimalist framework that provides a thin layer of basic web app features. Easily customizable. Can use middleware for request handling. Single language (Javascript) required for front-end and back-end. Fast to connect with a database if need-be. 
    3. **Expo** - Out-of-the-box simulator that supports a wide range of devices. Provides many helpful modules within the expo library. Can test on my phone and have my friends scan the QR code to download the app.

### UI/UX design considerations

- **Colour palette** - Mandatory colours provided by Spotify themselves, as no app can be distributed using the Spotify API while using different colours.
- **Typography** - Same size, weight, family, colour, placement, and styles of text must remain readable by ensuring every letter is clear, while drawing attention to certain text.
- **Consistency** - Maintaining consistent styles helps guide users to understand what elements are clickable, where text-boxes are, and providing appropriate feedback. Extracting reusable components comes in handy here to make sure styles for all elements remain consistent (headers, buttons, text, colours).
- **Feedback** - Haptics, animations, and opacity changes are all used to provide user feedback. One example in particular is how the background colour changes based on the number of votes a track in the queue has- the more votes, the brighter the background. Another is that all of the icons in the room are animate when for example a track is added to the queue, the queue icon lights up green and animates upwards for a second, showing some indication that a change has been made. The same goes for the list of users in the room modal and the playing tab.
- **Keep interactive elements in known locations** - By not re-inventing the UX wheel, users will understand from their previous experiences with mobile apps, how to navigate and control the app.
- **Guide the users’ attention** - This combines several user-centred design rules, but the goal of this is to guide the users’ attention to elements that are important and interactive. Using a dark background on light text will be used.