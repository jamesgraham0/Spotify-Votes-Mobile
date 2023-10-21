✅ Good to go
🟡 In progress / Needs testing
🛑 Not working

**FUNCTIONALITY**
- ✅ Make the queue unique
- ✅ Queue available to add to before mounted #sick
- ✅ Add votes to every track
- ✅ Only allow room host to play and pause music
- ✅ When a track is added to the queue, show a small popup over the queue tab indicating that the track has been added.
- ✅ Add haptic feedback for button presses
- ✅ Set any track being searched for that's currently in the queue to have a blurred front with text saying "Track already in queue" 
- ✅ For users without Spotify Premium, restrict them from creating rooms (only joining), and searching for tracks (only voting on the queue)
- ✅ When creating a room, Redirect to Spotify app if there's no active deviceId
- ✅ Add a countdown timer in the queue screen when the next track is about to play
- ✅ Only allow a single vote to every track (see below)
- ✅ Add small photo on the queue card of who chose the track
- ✅ List of user names in a room once in the room
- ✅ Change room joining to a randomly generated code when the room is created
- ✅ Create room (updates state of list of joinable rooms) -> emit to everyone 
- ✅ Delete room (updates state of list of joinable rooms) -> emit to everyone
- ✅ Adding the first track to queue sets it to currentlyPlaying -> emit to everyone in room 
- ✅ Adding track to queue -> emit to everyone in room
- ✅ Autoplay next track in queue
- ✅ Pop queue when track finishes
- ✅ Sort queue by votes
- ✅ Flash green on the 'users' icon in the room when someone joins
- ✅ Set newly joined user's currently playing to what the room has currently playing
- ✅ Kick users from room when host leaves
- ✅ Display number of users in room
- ✅ Add who added the track
- ✅ Handle when non-host leaves the room
- ✅ Handle when host closes Spotify while Spotify Votes is still being used 
- ✅ Make the Landing page button look more like a button

**Running the code**
* Make sure you have Node.js installed
* Make sure you have the expo app installed on your phone
* Make sure you have the Spotify app installed on your phone
* Clone the repository


* In the root directory (*Spotify-Votes-Mobile*), run `npm install`
* Run `npx expo start` to start the client side simulator with expo
* In the *utils/constants.js* file, assign EXPO_IP to the IP address that is shown in the terminal, this is where expo is running and the client socket needs to connect to.
* In another terminal, go to the *server* directory and run `npm install`
* Run `npm start`, this will start the server

If you did it correctly you should see an acknowledgement in the terminal that the client has connected to the server, with matching socket id's.