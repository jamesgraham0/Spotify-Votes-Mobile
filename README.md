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
- 🛑 Kick users from room when host leaves and stop any timers, will have to add a 'playing': true || false attribute to every rm
- 🛑 room to stop the timer when a room is deleted
- 🛑 Maintain the green colour of the #votes to let the user know which tracks they've voted for
- ✅ Flash green on the 'users' icon in the room when someone joins + Animation's lookin gooooood
- 🛑 Set newly joined user's currently playing to what the room has currently playing

**FUNCTIONALITY**
- ✅ Progress bar for track
- 🛑 Add a countdown timer in the queue screen where the next track gets progressively more green.
- 🛑 ^^^ when the next track is popped from the queue, slide it to the left and fade it away
- ✅ Queue can only be added to once mounted. Should be able to add right away
- ✅ Add votes to every track
- 🛑 Only allow a single vote to every track (see below)
- 🛑 Display number of users in each room both in the list of joinable rooms, and in room
- 🛑 Add small photo on the queue card of who chose the track (or name)
- 🛑 List of user names in a room once in the room
- 🛑 Only allow room host to play and pause music
- 🛑 When a track is added to the queue, show a small popup over the queue tab indicating that the track has been added.

**OTHER**
- 🟡 Refactor and organize client-side code into one folder


<a href="https://socket.io/docs/v4/rooms/" target="_blank">Socket.IO Documentation</a>

Run expo r -c to clear expo cache and rebuild the project when getting "non-std C++ exception"


- 🛑 Only allow a single vote to every track
When a user votes for a track:
    emit to the room to add one to the votes of that track
    emit back to that specific user that they've voted for 
        add that users id to the tracks usersVoted[] array
    change the background of QueueTrack to usersVoted[].includes(user.id) ? 'green' : 'grey';