import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export function setupSocket(server: HttpServer) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  interface Equipo {
    nombreEquipo: string;
    logo: File | null;
    logoPreview: string;
    alineacion: string;
    colorimetria: string;
  }

  interface Jugador {
    nombre: string;
    numero: string;
    tipo: string;
    position?: string;
  }

  let jugadoresLocal: Jugador[] = [];
  let jugadoresVisitante: Jugador[] = [];
  let informacionLocal: Equipo[] = [];
  let informacionVisitante: Equipo[] = [];

  io.on("connection", (socket) => {
    // cliente conectado
    console.log("Cliente conectado:", socket.id);

    // PRUEBA GUARDAR JUGADORES -----------------------
    // socket.on("guardar-jugadores", (jugadores) => {
    //   jugadoresLocal = jugadores;
    // });

    // // 2. El Dashboard pide los jugadores actuales
    // socket.on("obtener-jugadores", () => {
    //   socket.emit("jugadores-actuales", jugadoresLocal);
    // });
    // --------------------------------------------------





    // enviar informacion y datos de jugadores equipo local al overlay
    socket.on("actualizar-overlay", (data) => {
      console.log(data);

      jugadoresLocal = data.jugadoresLocal;
      informacionLocal = data.mensaje;

      // socket.broadcast.emit("nuevo-dato-overlay", data);
      io.emit("nuevo-dato-overlay", data);
    });
    socket.on("obtener-jugadores", () => {
      socket.emit("jugadores-actuales", jugadoresLocal);
    });
    socket.on("obtener-info-local", () => {
      socket.emit("info-local",informacionLocal);
    })







    // enviar informacion y datos de jugadores equipo visitante al overlay
    socket.on("actualizar-overlay-equipo-visitante", (data) => {
      console.log(data);

      jugadoresVisitante = data.jugadoresVisitante;
      informacionVisitante = data.mensaje;

      
      io.emit("nuevo-dato-overlay-equipo-visitante", data);
    });

    socket.on("obtener-jugadores-visitante", () => {
      socket.emit("jugadores-actuales-visitante", jugadoresVisitante);
    });

    socket.on("obtener-info-visitante", () => {
      socket.emit("info-visitante",informacionVisitante);
    })





    // enviar instruccion de opacidad del marcador al overlay

    // socket.on("actualizar-instruccion", (data) => {
    //   console.log(data);

    //   socket.broadcast.emit("nueva-instruccion", data);
    // });

    // desconectar cliente

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
}
