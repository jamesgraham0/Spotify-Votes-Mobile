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
- ✅ Change room joining to a randomly generated code when the room is created, 
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
- ✅ Handle case where non-host leaves the room
- 🛑 Change playing and pausing to server-side
- 🛑 When the next track is popped from the queue, slide it to the left and fade it away
- 🛑 Animate adding a track to the queue, where the searched track shrinks and moves towards the queue
- 🛑 Prompts on how to search for a song, add a track, and general navigation about the room

**OTHER**
- 🛑 Documentation and refactoring for readability and maintainability