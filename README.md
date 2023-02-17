✅ Good to go
🟡 Needs testing / partially working
🛑 Not working


**SOCKETS**
- 🟡 Create room (updates state of list of joinable rooms) -> emit to everyone 
- 🟡 Delete room (updates state of list of joinable rooms) -> emit to everyone
- 🛑 Adding the first track to queue sets it to currentlyPlaying -> emit to everyone in room 
- 🛑 Adding track to queue -> emit to everyone in room



**FUNCTIONALITY**
- 🛑 Display number of users in each room both in the list of joinable rooms, and in room
- 🛑 Add small photo on the queue card of who chose the track (or name)
- 🛑 List of user names in a room once in the room
- 🛑 Autoplay next track in queue
- 🛑 Pop queue when track finishes
- 🛑 Add 'votes' to a track
- 🛑 Sort a rooms' queue based on votes
- 🛑 Only allow room host to play and pause music
- 🛑 Progress bar for track
- 🛑 When a track is added to the queue, show a small popup over the queue tab indicating that the track has been added.


**OTHER**
- 🟡 Refactor and organize client-side code into one folder