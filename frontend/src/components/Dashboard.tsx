import { socket } from "../sockets/sockets";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
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

function Dashboard() {
  interface Equipo {
    nombreEquipo: string;
    logo: File | null;
    logoPreview: string;
    alineacion: string;
    colorimetria: string;
    Goles: number;
  }

  // interface de los jugadores de ambos equipos
  interface Jugador {
    nombre: string;
    numero: string;
    tipo: string;
  }

  // ------LOCAL----------
  // varianes de jugadores y de equipo
  const [jugadoresPrueba, setJugadoresPrueba] = useState<Jugador[]>([]);
  const [informacion1, setinformacion1] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
    Goles: 0,
  });

  useEffect(() => {
    // informacion jugadores local
    const recibirJugadores = (data: Jugador[]) => {
      setJugadoresPrueba(data);
    };

    socket.on("jugadores-actuales", recibirJugadores);

    socket.emit("obtener-jugadores");

    // informacion equipo local
    const recibirInformacionLocal = (data: Equipo) => {
      // console.log("DATOS QUE LLEGAN:", data);
      // console.log("GOLES QUE LLEGAN:", data.Goles);

      // setinformacion1(data);
      setinformacion1(data);
    };
    socket.on("info-local", recibirInformacionLocal);
    socket.emit("obtener-info-local");

    // retornar sockets.off's
    return () => {
      socket.off("jugadores-actuales", recibirJugadores);
      socket.off("info-local", recibirInformacionLocal);
    };
  }, []);

  // ---------VISITANTE-------------

  const [informacion2, setinformacion2] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
    Goles: 0,
  });
  const [jugadoresPruebaV, setJugadoresPruebaV] = useState<Jugador[]>([]);

  useEffect(() => {
    // recuperar informacion de jugadores visitante
    const recibirJugadoresV = (data: Jugador[]) => {
      setJugadoresPruebaV(data);
    };

    socket.on("jugadores-actuales-visitante", recibirJugadoresV);

    socket.emit("obtener-jugadores-visitante");

    // recuperar informacion de equipo visitante
    const recibirInformacionVisitante = (data: Equipo) => {
      setinformacion2(data);
    };
    socket.on("info-visitante", recibirInformacionVisitante);
    socket.emit("obtener-info-visitante");

    // retornar socker.off
    return () => {
      socket.off("jugadores-actuales-visitante", recibirJugadoresV);
      socket.off("info-visitante", recibirInformacionVisitante);
    };
  }, []);

  // ----- MODAL PARA ACCIONES RÁPIDAS -------

  const [modalEventos, setmodalEventos] = useState(true);

  const AbrirModal = () => {
    setmodalEventos(false);
  };

  // const FuncionGol = (equipo: Equipo) => {
  //   equipo.Goles += 1;
  //   // console.log(equipo.nombreEquipo, "tiene", equipo.Goles, "goles totales");
  //   setmodalEventos(true);

  //   socket.emit("actualizarGoles", {
  //     mensaje: equipo,
  //   });
  // };
  const FuncionGol = (equipo: Equipo) => {
  equipo.Goles += 1;

  setmodalEventos(true);

  socket.emit("actualizarGoles", {
    nombreEquipo: equipo.nombreEquipo,
    goles: equipo.Goles,
  });
};

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
            background: `${informacion1.colorimetria}33`,
            border: `3px solid ${informacion1.colorimetria}`,
          }}
        >
          <div className={styles.titleEquipoLocal}>
            <img src={informacion1.logoPreview} width="50" />
            <p>{informacion1.nombreEquipo}</p>
            <p>{informacion1.Goles}</p>
          </div>

          <div
            className={styles.JugadoresEquipoLocal}
            style={{ border: `3px solid ${informacion1.colorimetria}` }}
          >
            <div className={styles.divJugadores}>
              TITULARES
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
              {jugadoresPrueba
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

        {modalEventos ? (
          <div className={styles.divEventos}>
            <p className={styles.p}>EVENTOS RÁPIDOS</p>

            <article className={styles.tarjetaAmarilla}>
              <img
                src={tarjetaAmarilla}
                width="50"
                style={{ margin: "10px" }}
              />
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

            <article className={styles.Gol} onClick={AbrirModal}>
              <img src={gol} width="50" style={{ margin: "10px" }} />
              <p>GOL</p>
            </article>
          </div>
        ) : (
          <div className={styles.divEventos}>
            <p className={styles.p}>ELIGE EL EQUIPO QUE METIÓ GOL</p>

            <article
              style={{
                background: `${informacion1.colorimetria}33`,
                border: `3px solid ${informacion1.colorimetria}`,
                color: `${informacion1.colorimetria}`,
                cursor: "pointer",
              }}
              onClick={() => FuncionGol(informacion1)}
            >
              <img
                src={informacion1.logoPreview}
                width="50"
                style={{ margin: "10px" }}
              />
              <p>{informacion1.nombreEquipo}</p>
            </article>

            <article
              style={{
                background: `${informacion2.colorimetria}33`,
                border: `3px solid ${informacion2.colorimetria}`,
                color: `${informacion2.colorimetria}`,
                cursor: "pointer",
              }}
              onClick={() => FuncionGol(informacion2)}
            >
              <img
                src={informacion2.logoPreview}
                width="50"
                style={{ margin: "10px" }}
              />
              <p>{informacion2.nombreEquipo}</p>
            </article>
          </div>
        )}

        {/* EQUIPO VISITANTE */}

        <div
          className={styles.divEquipoVisitante}
          style={{
            background: `${informacion2.colorimetria}33`,
            border: `3px solid ${informacion2.colorimetria}`,
          }}
        >
          <div className={styles.titleEquipoLocal}>
            <img src={informacion2.logoPreview} width="50" />
            <p>{informacion2.nombreEquipo}</p>
            <p>{informacion2.Goles}</p>
          </div>

          <div
            className={styles.JugadoresEquipoVisitante}
            style={{ border: `3px solid ${informacion2.colorimetria}` }}
          >
            <div className={styles.divJugadores}>
              TITULARES
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

export default Dashboard;
