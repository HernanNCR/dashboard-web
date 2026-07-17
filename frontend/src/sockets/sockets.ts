import { io } from "socket.io-client";


export const socket = io(
  "http://localhost:3000"
);

// entender que significa esto, que puede ser la conexion entre las 2 vistas