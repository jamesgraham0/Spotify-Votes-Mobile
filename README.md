✅ Good to go
🟡 Needs testing with other devices
🛑 Not working


**SOCKETS**
- ✅ Create room (updates state of list of joinable rooms) -> emit to everyone 
- ✅ Delete room (updates state of list of joinable rooms) -> emit to everyone
- ✅ Adding the first track to queue sets it to currentlyPlaying -> emit to everyone in room 
- ✅ Adding track to queue -> emit to everyone in room
- ✅ Autoplay next track in queue
- ✅ Pop queue when track finishes
- ✅ Sort queue by votes
- ✅ Flash green on the 'users' icon in the room when someone joins
- 🟡 Set newly joined user's currently playing to what the room has currently playing ** restarts the track**
- 🛑 Kick users from room when host leaves and stop any timers, will have to add a 'playing': true || false attribute to every rm
- 🛑 room to stop the timer when a room is deleted
- 🛑 Maintain the green colour of the #votes to let the user know which tracks they've voted for

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
- ✅ Add a countdown timer in the queue screen.
- 🛑 Change playing and pausing to server-side
- 🛑 Only allow a single vote to every track (see below)
- 🛑 Allow the host to remove tracks from the queue
- 🛑 Display number of users in each room both in the list of joinable rooms, and in room
- 🛑 Add small photo on the queue card of who chose the track (Fix children with the same key)
- 🛑 List of user names in a room once in the room
- 🛑 Don't countdown before next track if there's no track in the queue

**ANIMATION**
- 🛑 When the next track is popped from the queue, slide it to the left and fade it away
- 🛑 Animate adding a track to the queue, where the searched track shrinks and moves towards the queue
- 🛑 Animate queue timer

**Errors**
- ✅ Trim search string so that api calls to search for tracks aren't made with empty strings
- Song starts from beginning when new user joins
- When someone tries to create room this error:
Cannot read property 'error' of null
at node_modules/spotify-web-api-node/src/http-manager.js:34:56 in _toError
at node_modules/spotify-web-api-node/src/http-manager.js:71:32 in req.end$argument_0
... 14 more stack frames from framework internals
- Handle when search bar only contains " "

<a href="https://socket.io/docs/v4/rooms/" target="_blank">Socket.IO Documentation</a>

Run expo r -c to clear expo cache and rebuild the project when getting "non-std C++ exception"


- 🛑 Only allow a single vote to every track
When a user votes for a track:
    emit to the room to add one to the votes of that track
    emit back to that specific user that they've voted for 
        add that users id to the tracks usersVoted[] array
    change the background of QueueTrack to usersVoted[].includes(user.id) ? 'green' : 'grey';