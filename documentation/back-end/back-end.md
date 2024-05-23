As of now, the backend consists of an Express server that handles:

- API requests to Spotify
- An open socket connection for bi-directional info passing
- A list of rooms where each room consists of the following structure:
    
    ```jsx
    {
    "currentlyPlaying": {
    "title": "",
    "uri": "",
    "smallImage": "",
    "largeImage": "",
    "duration": 0,
    },
    "deviceId": "b166d1276412b883e0b37b6ef1112e656a5dc127",
    "hostId": "t1wyfo4650rthc8s0y3bmfhm8",
    "id": "oaijwefojewfewfaiejfojawef",
    "name": "1",
    "code": "00000",
    "queue": [],
    "users": []
    }
    ```
    
- GET operation endpoints for quick data retrieval from the server:
    
    ```jsx
    ///////////////// GET OPERATIONS /////////////////
    app.get("/rooms", (req, res) => {
    	res.json(rooms);
    });
    
    app.get('/queue/:id', (req, res) => {
    	const { id } = req.params;
    	const room = findRoomById(id);
    	res.json(room.queue);
    });
    
    app.get('/code/:id', (req, res) => {
    	const { id } = req.params;
    	const room = findRoomById(id);
    	res.json(room.code);
    });
    ```