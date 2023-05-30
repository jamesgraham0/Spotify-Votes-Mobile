✅ Good to go
🟡 Needs testing with other devices, works locally
🛑 Not working / Working on it

**FUNCTIONALITY**
- ✅ Create room (updates state of list of joinable rooms) -> emit to everyone 
- ✅ Delete room (updates state of list of joinable rooms) -> emit to everyone
- ✅ Adding the first track to queue sets it to currentlyPlaying -> emit to everyone in room 
- ✅ Adding track to queue -> emit to everyone in room
- ✅ Autoplay next track in queue
- ✅ Pop queue when track finishes
- ✅ Sort queue by votes
- ✅ Queue can only be added to once mounted. Should be able to add right away
- ✅ Add votes to every track
- ✅ Display number of users in each room both in the list of joinable rooms, and in room
- ✅ List of user names in a room once in the room
- 🛑 Only allow room host to play and pause music
- 🛑 Limit a user's votes to a track to 1
- 🛑 Kick users from room when host leaves and stop any timers, will have to add a 'playing': true || false attribute to every rm
- 🛑 room to stop the timer when a room is deleted

**Stylistic**
- ✅ Maintain the green colour of the #votes to let the user know which tracks they've voted for
- ✅ When a track is added to the queue, show a small popup over the queue tab indicating that the track has been added.
- ✅ Flash green on the 'users' icon in the room when someone joins (Animation's lookin gooooood :) )
- ✅ Progress bar for track (was removed in commit 28)
- 🛑 When the next track is popped from the queue, slide it to the left and fade it away
- 🛑 Add small photo on the queue card of who chose the track (or name)

**OTHER**
- 🟡 Refactor and organize client-side code into one folder (a little messy right now)
<a href="https://socket.io/docs/v4/rooms/" target="_blank">Socket.IO Documentation</a>
Run expo r -c to clear expo cache and rebuild the project when getting "non-std C++ exception"
