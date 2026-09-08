import Style from "./TeamOne.module.css";
import { socket } from "../sockets/sockets";
import { useState, useEffect } from "react";

function Overlay() {
  // interface de los 2 equipos
  interface mensaje {
    nombreEquipo: string;
    logo: File | null;
    logoPreview: string;
    alineacion: string;
    colorimetria: string;
  }

  //   informacion del equipo local
  const [mensaje, setMensaje] = useState<mensaje>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
  });
  //  informacion del equipo visitante
  const [mensaje2, setMensaje2] = useState<mensaje>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
  });

  // interface de los jugadores de ambos equipos
  // interface Jugador {
  //   nombre: string;
  //   numero: string;
  // }

  // //   datos jugadores equipo local
  // const [datosJugadores, setDatosJugadores] = useState<Jugador[]>([]);
  // //   datos jugadores equipo visitante
  // const [datosJugadores2, setDatosJugadores2] = useState<Jugador[]>([]);
  

  

  useEffect(() => {
    socket.on("nuevo-dato-overlay", (data) => {
      console.log("🔥 EVENTO LOCAL COMPLETO:", data);
      console.log("🔥 NOMBRE LOCAL:", data.mensaje.nombreEquipo);

      setMensaje(data.mensaje);
      // setDatosJugadores(data.jugadoresLocal);
    });
  }, []);

  useEffect(() => {
    socket.on("nuevo-dato-overlay-equipo-visitante", (data) => {
      console.log("🔥 EVENTO VISITANTE COMPLETO:", data);
      console.log("🔥 NOMBRE VISITANTE:", data.mensaje.nombreEquipo);

      setMensaje2(data.mensaje);
      // setDatosJugadores2(data.jugadoresVisitante);
    });
  }, []);

  useEffect(() => {
    console.log("🟢 OVERLAY MONTADO");

    return () => {
      console.log("🔴 OVERLAY DESMONTADO");
    };
  }, []);

  useEffect(() => {
    console.log("📌 ESTADO LOCAL:", mensaje);
  }, [mensaje]);

  useEffect(() => {
    console.log("📌 ESTADO VISITANTE:", mensaje2);
  }, [mensaje2]);

  return (
    <div>
      <article className={Style.marcadorEquipo}>
        <img src={mensaje.logoPreview} width={120} />
        <p
          className={Style.nombreprueba}
          // style={{
          //   opacity: instrucciones,
          // }}
        >
          {mensaje.nombreEquipo} VS {mensaje2.nombreEquipo}
        </p>
        <img src={mensaje2.logoPreview} width={120} />
      </article>

      
    </div>
  );
}

export default Overlay;
