let rooms = [
  {
    currentlyPlaying: {
      title: "",
      uri: "",
      smallImage: "",
      largeImage: "",
      duration: 0,
    },
    deviceId: "b166d1276412b883e0b37b6ef1112e656a5dc127",
    hostId: "t1wyfo4650rthc8s0y3bmfhm8",
    id: "oaijwefojewfewfaiejfojawef",
    name: "1",
    code: "00000",
    queue: [],
    users: [],
  },
];

const generateRandomString = () => {
  const characters = "0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

 const addRoom = (room) => {
  rooms.unshift(room);
};

 const removeRoom = (index) => {
  rooms.splice(index, 1);
};

 const getRooms = () => {
  return rooms;
};

 const findRoomById = (roomId) => {
  return rooms.find((room) => room.id === roomId);
};

 const findRoomByCode = (code) => {
  return rooms.find((room) => room.code === code);
};

export const roomOperations = {
  addRoom,
  removeRoom,
  getRooms,
  findRoomById,
  findRoomByCode,
  generateRandomString,
};
