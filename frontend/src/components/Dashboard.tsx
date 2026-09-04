import { useState } from "react";
import { socket } from "../sockets/sockets";

import { useNavigate } from "react-router-dom";

// import styles from "./Dashboard.module.css";

import style from "./TeamOne.module.css";

function Dashboard() {
  const navigate = useNavigate();

  // --------------- //
  //   Equipo Local  //
  // --------------- //
  // const [Modal, setModal] = useState(true);

  // --------------------------------
  // interfaces de Equipo y Jugadores
  // --------------------------------
  //ayudan a definir el objeto y sus propiedades para que las funciones solo rellenen deacuerdo a lo que aqui se establezca
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

  // --------------------------------------------------------------------------------------
  // Estados de cambio, variables que ayudan a obtener informacion de los puntos de entrada
  // --------------------------------------------------------------------------------------
  // informacionTeamOne sirve para tomar la informacion del equipo Local
  const [informacionTeamOne, setinformacionTeamOne] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
  });
  // cantidadJugadores sirve para guardar la cantidad total de los jugadores del equipo
  const [cantidadJugadores, setcantidadJugadores] = useState(0);

  // button es un condicional para poder ver o no ver el botón del siguiente paso del registro del equipo
  // const [button, setButton] = useState(true);

  // datosJugadores nos ayuda a guardar en arreglos la información de cada jugador
  const [datosJugadores, setDatosJugadores] = useState<Jugador[]>([]);

  // ------------
  // Funciones
  // ------------
  // InputChange guarda infromacion general del equipo, como lo es nombre y logo
  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files?.[0]) {
      const archivo = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;

        setinformacionTeamOne((prev) => ({
          ...prev,
          logo: archivo,
          logoPreview: base64,
        }));
      };

      reader.readAsDataURL(archivo);

      return;
    }

    setinformacionTeamOne((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SelectChange guarda informacion del select de alineación
  const SelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setinformacionTeamOne((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // verInfo es un boton de prueba para poder
  // const verInfo = () => {
  //   setModal(false);
  // };

  // changeCantidad guarda la cantidad total de jugadores y marca el cambio de bandera en setButton
  const changeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setcantidadJugadores(Number(value));
    // setButton(false);
  };

  // guardarNombre guarda el nombre y numero del jugador dependiendo el index si el index no existe en el arrelgo se agrega y que agrega? el index, el campo y el valor
  const guardarNombre = (
    index: number,
    campo: "nombre" | "numero" | "tipo",
    valor: string,
    // list: string,
  ) => {
    setDatosJugadores((prev) => {
      const jugadores = [...prev];

      if (!jugadores[index]) {
        jugadores[index] = {
          nombre: "",
          numero: "",
          tipo: "",
          // list:"",
        };
      }

      jugadores[index][campo] = valor;

      return jugadores;
    });
  };

  // ----------------------- //
  // INSTRUCCIONES GENERALES //
  // ----------------------- //

  // Boton para enviar mensaje a overlay
  const Onclick = () => {
    if (
      informacionTeamOne.nombreEquipo &&
      informacionTeamOne.logoPreview &&
      informacionTeamOne.colorimetria &&
      informacionTeamOne.alineacion &&
      cantidadJugadores > 0 &&
      datosJugadores.length > 0
    ) {
      setAlineaciones(false);
      setlocal(false);
    } else {
      console.log("complete los campos");
    }
  };

  const buttOnTerminarRegistro = () => {

    setBandera(2);


    

    
  };

  const buttOnTerminarRegistroVisit = () => {

    navigate("/Components");

    socket.emit("actualizar-overlay", {
      mensaje: informacionTeamOne,
      jugadoresLocal: datosJugadores,
    });

    socket.emit("actualizar-overlay-equipo-visitante", {
      mensaje: informacionTeamTwo,
      jugadoresVisitante: datosJugadoresTeamTwo,
    });



    
  };

  // ------------------ //
  //  EQUIPO VISITANTE  //
  // ------------------ //
  const [informacionTeamTwo, setinformacionTeamTwo] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    logoPreview: "",
    alineacion: "",
    colorimetria: "",
  });

  const InputChangeTeamTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files?.[0]) {
      const archivo = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;

        setinformacionTeamTwo((prev) => ({
          ...prev,
          logo: archivo,
          logoPreview: base64,
        }));
      };

      reader.readAsDataURL(archivo);

      return;
    }

    setinformacionTeamTwo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [cantidadJugadoresTeamTwo, setcantidadJugadoresTeamTwo] = useState(0);

  const changeCantidadTeamoTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setcantidadJugadoresTeamTwo(Number(value));
    // setbuttonTeamTwo(false);
  };

  // SelectChange guarda informacion del select de alineación
  const SelectChangeTeamTwo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setinformacionTeamTwo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [datosJugadoresTeamTwo, setDatosJugadoresTeamTwo] = useState<Jugador[]>([]);

  const guardarNombreTeamTwo = (
    index: number,
    campo: "nombre" | "numero" | "tipo",
    valor: string,
  ) => {
    setDatosJugadoresTeamTwo((prev) => {
      const jugadores = [...prev];

      if (!jugadores[index]) {
        jugadores[index] = {
          nombre: "",
          numero: "",
          tipo: "",
        };
      }

      jugadores[index][campo] = valor;

      return jugadores;
    });
  };

  // Boton para enviar mensaje a overlay
  const Onclick2 = () => {
    
    if (
      informacionTeamTwo.nombreEquipo &&
      informacionTeamTwo.logoPreview &&
      informacionTeamTwo.colorimetria &&
      informacionTeamTwo.alineacion &&
      cantidadJugadoresTeamTwo > 0 &&
      datosJugadoresTeamTwo.length > 0
    ) {
      
      setalineacionesVisit(false);
      setVisitante(false);
    } else {
      console.log("complete los campos");
    }
  };

  const [alineacionesVisit, setalineacionesVisit] = useState(true);
  const [visitante, setVisitante] = useState(true);

  // -----------------------------------------------------------

  // variable para cambio de opacidad en el marcador
  // var [instruccionOpacity, setinstruccionesOpacity] = useState(0);

  // const cambiarValorDeInstruccion = () => {
  //   if (instruccionOpacity === 0) {
  //     setinstruccionesOpacity(1);

  //     socket.emit("actualizar-instruccion", {
  //       instrucciones: instruccionOpacity,
  //     });
  //   } else if (instruccionOpacity === 1) {
  //     setinstruccionesOpacity(0);

  //     socket.emit("actualizar-instruccion", {
  //       instrucciones: instruccionOpacity,
  //     });
  //   }
  // };

  // const [colorLocal, setColorLocal] = useState("#ffffff");
  // <button
  //               onClick={cambiarValorDeInstruccion}
  //               className={style.button}
  //             >
  //               {" "}
  //               Ver nombre de equipos
  //             </button>
  //             <button
  //               onClick={cambiarValorDeInstruccion}
  //               className={style.button}
  //             >
  //               Ver jugadores
  //             </button>

  // -----------------------------------------------------------

  const [alineaciones, setAlineaciones] = useState(true);
  const [local, setlocal] = useState(true);

  // funciones para arrastar jugadores

  const startDrag = (evt: React.DragEvent<HTMLDivElement>, item: Jugador) => {
    evt.dataTransfer.setData("itemID", item.numero);
    console.log(item);
  };

  const draggingOver = (evt: React.DragEvent<HTMLElement>) => {
    evt.preventDefault();
  };

  const drop = (evt: React.DragEvent<HTMLElement>, position: string) => {
    evt.preventDefault();

    const itemID = evt.dataTransfer.getData("itemID");

    setDatosJugadores((prev) =>
      prev.map((jugador) =>
        jugador.numero === itemID ? { ...jugador, position } : jugador,
      ),
    );

    
  };

  const dropVisit = (evt: React.DragEvent<HTMLElement>, position: string) => {
    evt.preventDefault();

    const itemID = evt.dataTransfer.getData("itemID");

    setDatosJugadoresTeamTwo((prev) =>
      prev.map((jugador) =>
        jugador.numero === itemID ? { ...jugador, position } : jugador,
      ),
    );

    
  };

  const filasAlineacion = informacionTeamOne.alineacion.split("-").map(Number);
  const filasAlineacion2 = informacionTeamTwo.alineacion.split("-").map(Number);

  // BANDERA PARA CONTROLAR VISTA

  const [bandera,setBandera] = useState(1);

  if (bandera === 1) {
    return (
      <div className={style.secciones}>
        {local && (
          <section className={style.seccionDatos}>
            <div className={style.seccionD2}>
              <article
                className={style.articleSeccion}
                id={style.nombreEQUIPOLOCAL}
              >
                <p>ESCRIBE EL NOMBRE DEL EQUIPO LOCAL</p>
                <input
                  className={style.inputSeccion}
                  type="text"
                  maxLength={3}
                  name="nombreEquipo"
                  onChange={InputChange}
                />
              </article>

              <article
                className={style.articleSeccion}
                id={style.alineacionEQUIPOLOCAL}
              >
                <p>ALINEACIÓN</p>
                <select
                  name="alineacion"
                  onChange={SelectChange}
                  className={style.inputSeccion}
                >
                  <option></option>
                  <option value="4-4-2">4-4-2</option>
                  <option value="5-3-1">5-3-1</option>
                  <option value="3-4-1-2">3-4-1-2</option>
                </select>
              </article>

              <article
                className={style.articleSeccion}
                id={style.logoEQUIPOLOCAL}
              >
                <p>SUBIR ARCHIVO DE IMAGEN DEL LOGO</p>
                <input
                  className={style.inputSeccion}
                  type="file"
                  accept="image/*"
                  name="logo"
                  onChange={InputChange}
                />
              </article>
            </div>

            <div className={style.seccionD2}>
              <article
                className={style.articleSeccion}
                id={style.colorEQUIPOLOCAL}
              >
                <p>COLOR</p>
                <input
                  name="colorimetria"
                  type="color"
                  value={informacionTeamOne.colorimetria}
                  onChange={InputChange}
                />
              </article>

              <article
                className={style.articleSeccionJugadores}
                id={style.jugadoresEQUIPOLOCAL}
              >
                <article className={style.titleArticleSeccion}>
                  <p>CANTIDAD DE JUGADORES</p>

                  <input
                    type="number"
                    max={22}
                    onChange={changeCantidad}
                    className={style.inputSeccion}
                    style={{ width: 100 }}
                  />
                </article>

                <hr />

                <section className={style.modalTeam}>
                  {Array.from({
                    length: Number(cantidadJugadores),
                  }).map((_, index) => (
                    <article key={index}>
                      <input
                        className={style.inputSeccion}
                        type="text"
                        placeholder={`Nombre Jugador ${index + 1}`}
                        name={`Jugador ${index + 1}`}
                        onChange={(e) =>
                          guardarNombre(index, "nombre", e.target.value)
                        }
                        style={{ width: 700 }}
                      />
                      <input
                        type="text"
                        // className={style.numberPlayer}
                        style={{
                          width: 70,
                          margin: 5,
                          backgroundColor: "#111B24",
                        }}
                        className={style.inputSeccion}
                        name={`Numero jugador ${index + 1}`}
                        placeholder="22"
                        onChange={(e) =>
                          guardarNombre(index, "numero", e.target.value)
                        }
                      />
                      <select
                        className={style.inputSeccion}
                        style={{ width: 150, backgroundColor: "#111B24" }}
                        name={`tipo ${index + 1}`}
                        onChange={(e) =>
                          guardarNombre(index, "tipo", e.target.value)
                        }
                      >
                        <option value="">ELIGE OPCION</option>
                        <option value="1">TITULAR</option>
                        <option value="0">RESERVA</option>
                      </select>
                    </article>
                  ))}
                </section>
              </article>
              <button
                className={
                  informacionTeamOne.nombreEquipo &&
                  informacionTeamOne.logoPreview &&
                  informacionTeamOne.colorimetria &&
                  informacionTeamOne.alineacion &&
                  cantidadJugadores > 0 &&
                  datosJugadores.length > 0
                    ? style.button
                    : style.button_desactive
                }
                onClick={Onclick}
              >
                SIGUIENTE
              </button>
            </div>
          </section>
        )}
        {!alineaciones && (
          <section className={style.alineacionesTitulares}>
            <div className={style.alineacionCentral}>
              <div className={style.contenedorAlineacion}>
                <center>
                  <p>AJUSTE DE ALINEACION {informacionTeamOne.alineacion}</p>
                </center>
                {/* contenedor de cajitas para alineaciones */}
                <div className={style.alineacion}>
                  {filasAlineacion.map((cantidad, filaIndex) => (
                    <div
                      key={filaIndex}
                      className={style.fila}
                      style={{
                        gridTemplateColumns: `repeat(${cantidad}, 1fr)`,
                      }}
                    >
                      {Array.from({ length: cantidad }).map(
                        (_, jugadorIndex) => {
                          const position = `fila_${filaIndex}_posicion_${jugadorIndex}`;

                          const jugador = datosJugadores.find(
                            (jugador) => jugador.position === position,
                          );

                          return (
                            <article
                              key={jugadorIndex}
                              onDragOver={draggingOver}
                              onDrop={(evt) => drop(evt, position)}
                            >
                              {jugador && (
                                <div className={style.titular}>
                                  <p>{jugador.nombre}</p>
                                </div>
                              )}
                            </article>
                          );
                        },
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={style.seleccionTitulares}>
              {/* contenedor de nombres */}
              <article className={style.contenedorTITULARES}>
                <p>TITULARES</p>
                {datosJugadores
                  .filter((jugador) => jugador.tipo === "1")
                  .map((jugador, index) => (
                    <div
                      key={index}
                      className={style.titular}
                      draggable
                      onDragStart={(evt) => startDrag(evt, jugador)}
                    >
                      <p>{jugador.nombre}</p>
                    </div>
                  ))}
              </article>
              <button
                className={
                  datosJugadores
                    .filter((jugador) => jugador.tipo === "1")
                    .every((jugador) => jugador.position)
                    ? style.button
                    : style.button_desactive
                }
                onClick={buttOnTerminarRegistro}
                style={{ marginTop: 30, width: 350 }}
              >
                GUARDAR CAMBIOS
              </button>
            </div>
          </section>
        )}
      </div>
    );
  } else if (bandera === 2) {
    return (
      <div className={style.secciones}>
        {visitante && (
          <section className={style.seccionDatos}>
            <div className={style.seccionD2}>
              <article className={style.articleSeccion}>
                <p>NOMBRE EQUIPO VISITANTE</p>
                <input
                  className={style.inputSeccion}
                  type="text"
                  maxLength={3}
                  name="nombreEquipo"
                  onChange={InputChangeTeamTwo}
                />
              </article>

              <article className={style.articleSeccion}>
                <p>SELECCIONAR ALINEACIÓN</p>
                <select
                  name="alineacion"
                  className={style.inputSeccion}
                  onChange={SelectChangeTeamTwo}
                >
                  <option></option>
                  <option value="4-4-2">4-4-2</option>
                  <option value="5-3-1">5-3-1</option>
                  <option value="3-4-1-2">3-4-1-2</option>
                </select>
              </article>

              <article className={style.articleSeccion}>
                <p>LOGO EQUIPO VISITANTE</p>
                <input
                  className={style.inputSeccion}
                  type="file"
                  accept="image/*"
                  name="logo"
                  onChange={InputChangeTeamTwo}
                />
              </article>
            </div>

            <div className={style.seccionD2}>
              <article className={style.articleSeccion}>
                <p>COLOR</p>
                <input
                  name="colorimetria"
                  type="color"
                  value={informacionTeamTwo.colorimetria}
                  onChange={InputChangeTeamTwo}
                />
              </article>

              <article className={style.articleSeccionJugadores}>
                <article className={style.titleArticleSeccion}>
                  <p>CANTIDAD DE JUGADORES</p>

                  <input
                    type="number"
                    max={22}
                    onChange={changeCantidadTeamoTwo}
                    className={style.inputSeccion}
                    style={{ width: 100 }}
                  />
                </article>

                <hr />

                <section className={style.modalTeam}>
                  {Array.from({
                    length: Number(cantidadJugadoresTeamTwo),
                  }).map((_, index) => (
                    <article key={index}>
                      <input
                        className={style.inputSeccion}
                        type="text"
                        placeholder={`Nombre Jugador ${index + 1}`}
                        name={`Jugador ${index + 1}`}
                        onChange={(e) =>
                          guardarNombreTeamTwo(index, "nombre", e.target.value)
                        }
                        style={{ width: 700 }}
                      />
                      <input
                        type="text"
                        style={{
                          width: 70,
                          margin: 5,
                          backgroundColor: "#111B24",
                        }}
                        className={style.inputSeccion}
                        name={`Numero jugador ${index + 1}`}
                        placeholder="22"
                        onChange={(e) =>
                          guardarNombreTeamTwo(index, "numero", e.target.value)
                        }
                      />
                      <select
                        className={style.inputSeccion}
                        style={{ width: 150, backgroundColor: "#111B24" }}
                        name={`tipo ${index + 1}`}
                        onChange={(e) =>
                          guardarNombreTeamTwo(index, "tipo", e.target.value)
                        }
                      >
                        <option value="">ELIGE OPCION</option>
                        <option value="1">TITULAR</option>
                        <option value="0">RESERVA</option>
                      </select>
                    </article>
                  ))}
                </section>
              </article>

              <button
                className={
                  informacionTeamTwo.nombreEquipo &&
                  informacionTeamTwo.logoPreview &&
                  informacionTeamTwo.colorimetria &&
                  informacionTeamTwo.alineacion &&
                  cantidadJugadoresTeamTwo > 0 &&
                  datosJugadoresTeamTwo.length > 0
                    ? style.button
                    : style.button_desactive
                }
                onClick={Onclick2}
              >
                SIGUIENTE
              </button>
            </div>
          </section>
        )}
        {!alineacionesVisit && (
          <section className={style.alineacionesTitulares}>
            <div className={style.alineacionCentral}>
              <div className={style.contenedorAlineacion}>
                <center>
                  <p>AJUSTE DE ALINEACION {informacionTeamTwo.alineacion}</p>
                </center>
                {/* contenedor de cajitas para alineaciones */}
                <div className={style.alineacion}>
                  {filasAlineacion2.map((cantidad, filaIndex) => (
                    <div
                      key={filaIndex}
                      className={style.fila}
                      style={{
                        gridTemplateColumns: `repeat(${cantidad}, 1fr)`,
                      }}
                    >
                      {Array.from({ length: cantidad }).map(
                        (_, jugadorIndex) => {
                          const position = `fila_${filaIndex}_posicion_${jugadorIndex}`;

                          const jugador = datosJugadoresTeamTwo.find(
                            (jugador) => jugador.position === position,
                          );

                          return (
                            <article
                              key={jugadorIndex}
                              onDragOver={draggingOver}
                              onDrop={(evt) => dropVisit(evt, position)}
                            >
                              {jugador && (
                                <div className={style.titular}>
                                  <p>{jugador.nombre}</p>
                                </div>
                              )}
                            </article>
                          );
                        },
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={style.seleccionTitulares}>
              {/* contenedor de nombres */}
              <article className={style.contenedorTITULARES}>
                <p>TITULARES</p>
                {datosJugadoresTeamTwo
                  .filter((jugador) => jugador.tipo === "1")
                  .map((jugador, index) => (
                    <div
                      key={index}
                      className={style.titular}
                      draggable
                      onDragStart={(evt) => startDrag(evt, jugador)}
                    >
                      <p>{jugador.nombre}</p>
                    </div>
                  ))}
              </article>
              <button
                className={
                  datosJugadoresTeamTwo
                    .filter((jugador) => jugador.tipo === "1")
                    .every((jugador) => jugador.position)
                    ? style.button
                    : style.button_desactive
                }
                onClick={buttOnTerminarRegistroVisit}
                style={{ marginTop: 30, width: 350 }}
              >
                TERMINAR REGISTRO
              </button>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Dashboard;
