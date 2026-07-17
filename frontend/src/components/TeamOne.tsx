import { useState } from "react";
import style from "./TeamOne.module.css";

function TeamOne() {
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
  const [conditionalInfo, setconditionalInfo] = useState(true);

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
  const verjugadores = () => {
    console.log(informacionTeamOne);
    console.log(datosJugadores);

    setconditionalInfo(false);
  };

  // --------
  // VISTAS
  // --------

  // vista secundaria y se muestra dependiendo si ya agregaron la informacion completa
  if (!Modal) {
    return (
      <section className={style.modalTeam}>
        {conditionalInfo && (
          <>
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
              onChange={(e) => guardarNombre(index, "nombre", e.target.value)}
            />
            <input
              type="text"
              className={style.numberPlayer}
              name={`Numero jugador ${index + 1}`}
              placeholder="22"
              onChange={(e) => guardarNombre(index, "numero", e.target.value)}
            />
          </article>
        ))}

        <button className={style.button} onClick={verjugadores}>
          Guardar Información
        </button>
          </>
          
        )}

        

        {/* vista terciaria despues de guardar la informacion completa del equipo (se muestra toda la informacion) */}
        {!conditionalInfo && (
          <article>
            <p>Nombre Equipo: {informacionTeamOne.nombreEquipo}</p>
            {informacionTeamOne.logo && (
              <img
                src={URL.createObjectURL(informacionTeamOne.logo)}
                alt="Escudo del equipo"
                width={300}
              />
            )}
            <p>Alineación: {informacionTeamOne.alineacion}</p>
            <br />
            <p>Jugadores: </p>

            {datosJugadores.length > 0 ? (
              datosJugadores.map((item, index) => (
                <p key={index + 1}>
                  {item.nombre} - {item.numero}
                </p>
              ))
            ) : (
              <p>No hay jugadores registrados</p>
            )}
          </article>
        )}
      </section>
    );
  }

  // vista principal del usuario
  return (
    <div className={style.teamOne}>
      <section>
        <p>
          Nombre del Equipo Local. Solo permitido 3 Letras como en el ejemplo
        </p>
        <input
          name="nombreEquipo"
          type="text"
          maxLength={3}
          onChange={InputChange}
        />
      </section>
      <section>
        <p>Logo del Equipo Local</p>
        <input
          name="logo"
          type="file"
          accept="image/*"
          onChange={InputChange}
        />
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
      <section>
        <p>Cantidad de jugadores del Equipo</p>
        <input
          name="TotalJugadores"
          type="number"
          max={22}
          onChange={changeCantidad}
        />
      </section>

      {!button && (
        <button className={style.button} onClick={verInfo}>
          Siguiente
        </button>
      )}

      <br />
    </div>
  );
}

export default TeamOne;
