import style from "./Overlay.module.css";
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
    Goles: Number;
  }

  //   informacion del equipo local
  const [mensaje, setMensaje] = useState<mensaje>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
    Goles: 0,
  });
  //  informacion del equipo visitante
  const [mensaje2, setMensaje2] = useState<mensaje>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
    Goles: 0,
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
      // console.log("🔥 EVENTO LOCAL COMPLETO:", data);
      // console.log("🔥 NOMBRE LOCAL:", data.mensaje.nombreEquipo);

      setMensaje(data.mensaje);
      // setDatosJugadores(data.jugadoresLocal);
    });
  }, []);

  useEffect(() => {
    socket.on("nuevo-dato-overlay-equipo-visitante", (data) => {
      // console.log("🔥 EVENTO VISITANTE COMPLETO:", data);
      // console.log("🔥 NOMBRE VISITANTE:", data.mensaje.nombreEquipo);

      setMensaje2(data.mensaje);
      // setDatosJugadores2(data.jugadoresVisitante);
    });
  }, []);


  // ACTUALIZAR GOLES
  const [goles, setGoles] = useState(0);
  const [goles2, setGoles2] = useState(0);

  useEffect(() => {
    const recibirGoles = (data: { nombreEquipo: string; goles: number }) => {
      setGoles(data.goles);
    };

    socket.on("nuevoDatoGoles", recibirGoles);

    return () => {
      socket.off("nuevoDatoGoles", recibirGoles);
    };
  }, []);

  useEffect(() => {
    const recibirGoles2 = (data: { nombreEquipo: string; goles: number }) => {
      setGoles2(data.goles);
    };

    socket.on("nuevoDatoGolesV", recibirGoles2);

    return () => {
      socket.off("nuevoDatoGolesV", recibirGoles2);
    };
  }, []);

  // useEffect(() => {
  //   console.log("🟢 OVERLAY MONTADO");

  //   return () => {
  //     console.log("🔴 OVERLAY DESMONTADO");
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("📌 ESTADO LOCAL:", mensaje);
  // }, [mensaje]);

  // useEffect(() => {
  //   console.log("📌 ESTADO VISITANTE:", mensaje2);
  // }, [mensaje2]);

  return (
    <div>
      <article className={style.marcadorEquipo}>
        <img src={mensaje.logoPreview} />
        <p className={style.nombreprueba}>
          {mensaje.nombreEquipo} {goles} VS {goles2} {mensaje2.nombreEquipo}
        </p>
        <img src={mensaje2.logoPreview} />
      </article>
    </div>
  );
}

export default Overlay;
