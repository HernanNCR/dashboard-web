import { socket } from "../sockets/sockets";
import { useState, useEffect } from "react";

import styles from "./Dashboard.module.css";
// import style from "./TeamOne.module.css";

import Overlay from "./Overlay";

// importar iconos
import gol from "../assets/icons/futbol-regular-full.svg";
import tarjetaAmarilla from "../assets/icons/amarilla.png";
import tarjetaRoja from "../assets/icons/roja.png";
import cambio from "../assets/icons/rotate-solid-full.svg";
import time from "../assets/icons/clock-solid-full.svg";
import timeExtra from "../assets/icons/tiempo-extra.png";
import vinculo from "../assets/icons/link-solid-full.svg";
import play from "../assets/icons/play-solid-full.svg";
import eye from "../assets/icons/eye-solid-full.svg";
import penal from "../assets/icons/penalty.png";

function Components() {
  interface Equipo {
    nombreEquipo: string;
    logo: File | null;
    logoPreview: string;
    alineacion: string;
    colorimetria: string;
  }

  // interface de los jugadores de ambos equipos
  interface Jugador {
    nombre: string;
    numero: string;
    tipo: string;
  }

  const [informacionTeamOne, setInformacionTeamOne] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
  });

  const [datosJugadores, setDatosJugadores] = useState<Jugador[]>([]);

  useEffect(() => {
    const recibirDatos = (data: any) => {
      console.log("DATOS RECIBIDOS EN DASHBOARD:", data);

      setInformacionTeamOne(data.mensaje);
      setDatosJugadores(data.jugadoresLocal);
    };

    socket.on("nuevo-dato-overlay", recibirDatos);

    return () => {
      socket.off("nuevo-dato-overlay", recibirDatos);
    };
  }, []);

  const [jugadores2, setjugadores2] = useState<Jugador[]>([]);

  useEffect(() => {
    const recibirJug = (data: any) => {
      setjugadores2(data);
    };
    socket.emit("obtener-jugadores", recibirJug);
  });

  const [datosJugadores2, setDatosJugadores2] = useState<Jugador[]>([]);

  const [informacionTeamTwo, setinformacionTeamTwo] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
  });

  useEffect(() => {
    const recibirDatos = (data: any) => {
      console.log("DATOS RECIBIDOS EN DASHBOARD:", data);

      setinformacionTeamTwo(data.mensaje);
      setDatosJugadores2(data.jugadoresVisitante);
    };

    socket.on("nuevo-dato-overlay-equipo-visitante", recibirDatos);

    return () => {
      socket.off("nuevo-dato-overlay-equipo-visitante", recibirDatos);
    };
  }, []);

  // EJEMPLO---------

  const [jugadoresPrueba, setJugadoresPrueba] = useState<Jugador[]>([]);

  useEffect(() => {
    const recibirJugadores = (data: Jugador[]) => {
      setJugadoresPrueba(data);
    };

    socket.on("jugadores-actuales", recibirJugadores);

    socket.emit("obtener-jugadores");

    return () => {
      socket.off("jugadores-actuales", recibirJugadores);
    };
  }, []);


  const [jugadoresPruebaV, setJugadoresPruebaV] = useState<Jugador[]>([]);

  useEffect(() => {
    const recibirJugadoresV = (data: Jugador[]) => {
      setJugadoresPruebaV(data);
    };

    socket.on("jugadores-actuales-visitante", recibirJugadoresV);

    socket.emit("obtener-jugadores-visitante");

    return () => {
      socket.off("jugadores-actuales-visitante", recibirJugadoresV);
    };
  }, []);

  return (
    <div className={styles.body}>
      <nav className={styles.nav}>
        <article className={styles.navtitle}>
          <center>
            <h1>DASHBOARD EN VIVO</h1>
          </center>
        </article>
      </nav>

      <section className={styles.sectionTop}>
        {/* ESCENAS DE VIDEO */}

        <div className={styles.divEscenas}>
          <p>ESCENAS</p>

          <article className={styles.ArticleEscena}>
            <p>MARCADOR</p>
            <img src={eye} width="20" />
          </article>
          <article className={styles.ArticleEscena}>
            <p>ALINEACION LOCAL</p>
            <img src={eye} width="20" />
          </article>
          <article className={styles.ArticleEscena}>
            <p>ALINEACION VISITANTE</p>
            <img src={eye} width="20" />
          </article>
          <article className={styles.ArticleEscena}>
            <p>TIEMPO MARCADOR</p>
            <img src={eye} width="20" />
          </article>
          <article className={styles.ArticleEscena}>
            <p>MEDIO TIEMPO</p>
            <img src={eye} width="20" />
          </article>
          <article className={styles.ArticleEscena}>
            <p>FINAL DEL PARTIDO</p>
            <img src={eye} width="20" />
          </article>
          <article className={styles.ArticleEscena}>
            <p>TRANSICIÓN</p>
            <img src={eye} width="20" />
          </article>
        </div>

        {/* OVERLAY DE VIDEO */}

        {/* <div className={styles.divOverlay}>
            <Overlay />
          </div> */}
        <div className={styles.divOverlay}>
          {/* <h1 style={{ color: "red" }}>PRUEBA OVERLAY</h1> */}
          <Overlay />
          {/* <Components /> */}
        </div>

        {/* EXTRAS DE ESCENAS */}

        <div className={styles.divExtras}>
          <section className={styles.sectionExtras}>
            <div className={styles.contenedorExtras}>
              <article className={styles.titleExtras}>
                <img src={time} width="40" />
                <p>TIEMPO DEL PARTIDO</p>
              </article>
              <article className={styles.contenidoExtras}>
                <p>45:00</p>
                <button className={styles.buttonContenedorExtras}>
                  <img src={play} width="30" />
                </button>
              </article>
            </div>

            <div className={styles.contenedorExtras}>
              <article className={styles.titleExtras}>
                <img src={timeExtra} width="40" />
                <p>TIEMPO AGREGADO</p>
              </article>
              <article className={styles.contenidoExtras}>
                <p>45:00</p>
                <button className={styles.buttonContenedorExtras}>
                  <img src={play} width="30" />
                </button>
              </article>
            </div>

            <div className={styles.contenedorExtras}>
              <article className={styles.titleExtras}>
                <img src={vinculo} width="35" />
                <p>VÍNCULO OBS</p>
              </article>
              <article className={styles.contenidoExtras}>
                <button className={styles.contentVinculo}>
                  COPIAR VINCULO OBS
                  <div className={styles.botonInterno}>
                    <img src={vinculo} width="30" />
                  </div>
                </button>
              </article>
            </div>

            <div className={styles.contenedorExtras}>
              <article className={styles.titleExtras}>
                <img src={penal} width="50" />
                <p>MARCADOR DE PENALES</p>
              </article>
              <article className={styles.contenidoExtras}>
                <button className={styles.contentPenales}>
                  AGREGAR MARCADOR DE PENALES
                  <div className={styles.botonInterno}>
                    <img src={play} width="20" />
                  </div>
                </button>
              </article>
            </div>
          </section>
        </div>
      </section>

      <section className={styles.sectionBottom}>
        {/* EQUIPO LOCAL */}
        <div
          className={styles.divEquipoLocal}
          style={{
            background: `${informacionTeamOne.colorimetria}33`,
            border: `3px solid ${informacionTeamOne.colorimetria}`,
          }}
        >
          <center>
            <img src={informacionTeamOne.logoPreview} width="50" />
            <p>{informacionTeamOne.nombreEquipo}</p>
          </center>

          <div
            className={styles.JugadoresEquipoLocal}
            style={{ border: `3px solid ${informacionTeamOne.colorimetria}` }}
          >
            <div className={styles.divJugadores}>
              TITULARES
              {/* {datosJugadores
                .filter((jugador) => jugador.tipo === "1")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))} */}
              {/* {jugadores2
                .filter((jugador) => jugador.tipo === "1")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))} */}
              {jugadoresPrueba
                .filter((jugador) => jugador.tipo === "1")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))}
            </div>

            <div className={styles.divJugadores}>
              RESERVA
              {datosJugadores
                .filter((jugador) => jugador.tipo === "0")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))}
            </div>
          </div>
        </div>

        {/* EVENTOS RAPIDOS */}

        <div className={styles.divEventos}>
          <p className={styles.p}>EVENTOS RÁPIDOS</p>

          <article className={styles.tarjetaAmarilla}>
            <img src={tarjetaAmarilla} width="50" style={{ margin: "10px" }} />
            <p>TARJETA AMARILLA</p>
          </article>

          <article className={styles.tarjetaRoja}>
            <img src={tarjetaRoja} width="50" style={{ margin: "10px" }} />
            <p>TARJETA ROJA</p>
          </article>

          <article className={styles.Cambios}>
            <img src={cambio} width="40" style={{ margin: "10px" }} />
            <p>CAMBIO</p>
          </article>

          <article className={styles.Gol}>
            <img src={gol} width="50" style={{ margin: "10px" }} />
            <p>GOL</p>
          </article>
        </div>

        {/* EQUIPO VISITANTE */}

        <div
          className={styles.divEquipoVisitante}
          style={{
            background: `${informacionTeamTwo.colorimetria}33`,
            border: `3px solid ${informacionTeamTwo.colorimetria}`,
          }}
        >
          <center>
            <img src={informacionTeamTwo.logoPreview} width="50" />
            <p>{informacionTeamTwo.nombreEquipo}</p>
          </center>

          <div
            className={styles.JugadoresEquipoVisitante}
            style={{ border: `3px solid ${informacionTeamTwo.colorimetria}` }}
          >
            <div className={styles.divJugadores}>
              TITULARES
              {/* {datosJugadores2
                .filter((jugador) => jugador.tipo === "1")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))} */}
                {jugadoresPruebaV
                .filter((jugador) => jugador.tipo === "1")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))}
            </div>

            <div className={styles.divJugadores}>
              RESERVA
              {/* {datosJugadores2
                .filter((jugador) => jugador.tipo === "0")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))} */}
                {jugadoresPruebaV
                .filter((jugador) => jugador.tipo === "0")
                .map((jugador, index) => (
                  <article key={index} className={styles.etiquetaJugador}>
                    {jugador.numero} {jugador.nombre}
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Components;
