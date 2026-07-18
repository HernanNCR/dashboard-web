import styles from "./Dashboard.module.css";
import { socket } from "../sockets/sockets";
import { useState } from "react";

import style from "./TeamOne.module.css";

function Dashboard() {
  // --------------- //
  //   Equipo Local  //
  // --------------- //
  const [Modal, setModal] = useState(true);

  // --------------------------------
  // interfaces de Equipo y Jugadores
  // --------------------------------
  //ayudan a definir el objeto y sus propiedades para que las funciones solo rellenen deacuerdo a lo que aqui se establezca
  interface Equipo {
    nombreEquipo: string;
    logo: File | null;
    alineacion: string;
  }

  interface Jugador {
    nombre: string;
    numero: string;
  }

  // --------------------------------------------------------------------------------------
  // Estados de cambio, variables que ayudan a obtener informacion de los puntos de entrada
  // --------------------------------------------------------------------------------------
  // informacionTeamOne sirve para tomar la informacion del equipo Local
  const [informacionTeamOne, setinformacionTeamOne] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    alineacion: "",
  });
  // cantidadJuagdores sirve para guardar la cantidad total de los jugadores del equipo
  const [cantidadJugadores, setcantidadJugadores] = useState({});

  // button es un condicional para poder ver o no ver el botón del siguiente paso del registro del equipo
  const [button, setButton] = useState(true);

  // datosJugadores nos ayuda a guardar en arreglos la información de cada jugador
  const [datosJugadores, setDatosJugadores] = useState<Jugador[]>([]);

  // conditionalInfo es un condicional para poder ver o no ver la información guardada del equipo local
  // const [conditionalInfo, setconditionalInfo] = useState(true);

  // ------------
  // Funciones
  // ------------
  // InputChange guarda infromacion general del equipo, como lo es nombre y logo
  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;

    setinformacionTeamOne((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
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
  const verInfo = () => {
    setModal(false);
  };

  // changeCantidad guarda la cantidad total de jugadores y marca el cambio de bandera en setButton
  const changeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setcantidadJugadores(value);
    setButton(false);
  };

  // guardarNombre guarda el nombre y numero del jugador dependiendo el index si el index no existe en el arrelgo se agrega y que agrega? el index, el campo y el valor
  const guardarNombre = (
    index: number,
    campo: "nombre" | "numero",
    valor: string,
  ) => {
    setDatosJugadores((prev) => {
      const jugadores = [...prev];

      if (!jugadores[index]) {
        jugadores[index] = {
          nombre: "",
          numero: "",
        };
      }

      jugadores[index][campo] = valor;

      return jugadores;
    });
  };

  // verjugadores muestra la informacion de los equipos y ayuda en la variable de setconditionalInfo
  // const verjugadores = () => {
  //   console.log(informacionTeamOne);
  //   console.log(datosJugadores);

  //   // setconditionalInfo(false);
  // };

  // ------------------ //
  //  EQUIPO VISITANTE  //
  // ------------------ //

  // Boton para enviar mensaje a overlay
  const Onclick = () => {
    socket.emit("actualizar-overlay", {
      mensaje: informacionTeamOne,
      jugadoresLocal: datosJugadores,
    });
    // console.log(nombre);
  };

  

  // const senalEquipos = () => {
  //   socket.emit("actualizar-instruccion", {
  //     instrucciones: instruccionOpacity,
  //   })
  // }

  var [instruccionOpacity,setinstruccionesOpacity] = useState(0);

  const cambiarValorDeInstruccion = () => {
    if(instruccionOpacity === 0){
      setinstruccionesOpacity(1);

      socket.emit("actualizar-instruccion", {
      instrucciones: instruccionOpacity,
    })


    } else if(instruccionOpacity === 1){
      setinstruccionesOpacity(0);


      socket.emit("actualizar-instruccion", {
      instrucciones: instruccionOpacity,
    })
    }
  };

  return (
    <div className={styles.bodyNav}>
      <center>
        <h1>OBS Dashboard Controller</h1>
      </center>

      <section>
        <p>Selecciona tu logo</p>
        <input type="file" accept="image/*" />
      </section>
      {/* VISTA EQUIPO LOCAL */}

      <div className={style.teamOne}>
        <section>
          <p>
            Nombre del Equipo Visitante. Solo permitido 3 Letras como en el
            ejemplo
          </p>
          <input
            type="text"
            maxLength={3}
            name="nombreEquipo"
            onChange={InputChange}
          />
        </section>
        <section>
          <p>Logo del Equipo Visitante</p>
          <input
            type="file"
            accept="image/*"
            name="logo"
            onChange={InputChange}
          />
        </section>
        <section>
          <p>Cantidad de jugadores del Equipo</p>
          <input type="number" max={22} onChange={changeCantidad} />
        </section>
        <section>
          <p>Seleccionar Alineación</p>
          <select name="alineacion" onChange={SelectChange}>
            <option></option>
            <option value="4-4-2">4-4-2</option>
            <option value="5-3-1">5-3-1</option>
            <option value="3-4-1-2">3-4-1-2</option>
          </select>
        </section>
        {!button && (
          <button className={style.button} onClick={verInfo}>
            Siguiente
          </button>
        )}
      </div>
      {!Modal && (
        <section className={style.modalTeam}>
          
              <h1 className={style.titleModal}>
                Ingrese Nombre de los jugadores y número
              </h1>
              <br />
              {Array.from({
                length: Number(cantidadJugadores),
              }).map((_, index) => (
                <article key={index}>
                  <input
                    type="text"
                    placeholder={`Jugador ${index + 1}`}
                    name={`Jugador ${index + 1}`}
                    onChange={(e) =>
                      guardarNombre(index, "nombre", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className={style.numberPlayer}
                    name={`Numero jugador ${index + 1}`}
                    placeholder="22"
                    onChange={(e) =>
                      guardarNombre(index, "numero", e.target.value)
                    }
                  />
                </article>
              ))}

              <button className={style.button} onClick={Onclick}>
                Guardar Información
              </button>

              <button onClick={cambiarValorDeInstruccion} className={style.button}> Ver nombre de equipos</button>
              <button onClick={cambiarValorDeInstruccion} className={style.button}>Ver jugadores</button>
            
        </section>
      )}

      {/* <button onClick={Onclick}>Enviar a Overlay</button> */}
    </div>
  );
}

export default Dashboard;
