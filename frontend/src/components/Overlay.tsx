import Style from "./TeamOne.module.css";
import { socket } from "../sockets/sockets";
import { useState, useEffect } from "react";

function Overlay() {
  interface mensaje {
    nombreEquipo: string;
    logo: File | null;
    alineacion: string;
  }

  const [mensaje, setMensaje] = useState<mensaje>({
    nombreEquipo: "",
    logo: null,
    alineacion: "",
  });

  interface Jugador {
    nombre: string;
    numero: string;
  }

  const [datosJugadores, setDatosJugadores] = useState<Jugador[]>([]);
  const [instrucciones, setinstrucciones] = useState();

  useEffect(() => {
    socket.on("nuevo-dato-overlay", (data) => {
      setMensaje(data.mensaje);
      setDatosJugadores(data.jugadoresLocal);
    });
  }, []);
  
  useEffect(() => {
    socket.on("nueva-instruccion", (data) => {
      setinstrucciones(data.instrucciones);
    });
  }, []);

  return (
    <div>
      <p
        className={Style.nombreprueba}
        style={{
          opacity: instrucciones,
        }}
      >
        {mensaje.nombreEquipo} VS {mensaje.alineacion}
      </p>

      

      <div>
        {datosJugadores.map((jugador, index) => (
          <p key={index}>
            {jugador.nombre} - {jugador.numero}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Overlay;
