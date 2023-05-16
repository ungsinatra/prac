import io from "socket.io-client";

const mySocket = () => {
  return io(`http://localhost:3000`);
};
export const socket = mySocket();
