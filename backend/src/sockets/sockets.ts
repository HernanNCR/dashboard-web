import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

// aprender que es lo que está sucediendo y repetirlo desde cero

export function setupSocket(server: HttpServer) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    // informacion es la infromacion que viaja al backend

    // socket.on("conexion", (informacion) =>{ <- "conexion" es de donde parte la información
    //  socket.broadcast.emit( <- emit es a donde llegará la información
    //      "nuevo",
    //      informacion
    // })

    console.log("Cliente conectado:", socket.id);
    

    // enviar informacion y datos de jugadores equipo local al overlay
    socket.on("actualizar-overlay", (data) => {
      console.log(data);

      socket.broadcast.emit("nuevo-dato-overlay", data);
    });

    // enviar informacion y datos de jugadores equipo visitante al overlay
    socket.on("actualizar-overlay-equipo-visitante", (data) => {
      console.log(data);

      socket.broadcast.emit("nuevo-dato-overlay-equipo-visitante", data);
    });

    // enviar instruccion de opacidad del marcador al overlay
    socket.on("actualizar-instruccion", (data) => {
      console.log(data);

      socket.broadcast.emit("nueva-instruccion", data);
    });




    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
}
