import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

// aprender que es lo que está sucediendo y repetirlo desde cero

export function setupSocket(server: HttpServer) {

  const io = new SocketServer(server, {
    cors: {
      origin: "*"
    }
  });


  io.on("connection", (socket) => {

    console.log("Cliente conectado:", socket.id);


    socket.on("actualizar-overlay", (data) => {

      console.log(data);

      socket.broadcast.emit(
        "nuevo-dato-overlay",
        data
      );

    });

    socket.on("actualizar-instruccion", (data) => {

      console.log(data);

      socket.broadcast.emit(
        "nueva-instruccion",
        data
      );

    });


    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });

  });

}