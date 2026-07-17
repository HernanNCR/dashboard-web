import { use, useState } from "react";
import style from "./TeamOne.module.css";

function TeamTwo() {
  interface Equipo {
    nombreEquipo: string;
    logo: File | null;
    alineacion: string;
  }
  interface Jugador {
    nombre: string;
    numero: string;
  }

  const [informacionTeamTwo, setinformacionTeamTwo] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    alineacion: "",
  });
  // datosJugadores nos ayuda a guardar en arreglos la información de cada jugador
  const [datosJugadores, setDatosJugadores] = useState<Jugador[]>([]);
  // cantidadJuagdores sirve para guardar la cantidad total de los jugadores del equipo
  const [cantidadJugadoresTwo, setcantidadJugadoresTwo] = useState({});

  // button es un condicional para poder ver o no ver el botón del siguiente paso del registro del equipo
  const [button, setButton] = useState(true);
  const [Modal, setModal] = useState(true);
  const [conditionalInfo, setconditionalInfo] = useState(true);

  //
  //
  //
  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;

    setinformacionTeamTwo((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };

  const changeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setcantidadJugadoresTwo(value);
    setButton(false);
  };
  // SelectChange guarda informacion del select de alineación
  const SelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setinformacionTeamTwo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // verInfo es un boton de prueba para poder
  const verInfo = () => {
    setModal(false);
    console.log(informacionTeamTwo);
    console.log(cantidadJugadoresTwo);
  };
  // verjugadores muestra la informacion de los equipos y ayuda en la variable de setconditionalInfo
  const verjugadores = () => {
    console.log(informacionTeamTwo);
    console.log(datosJugadores);

    setconditionalInfo(false);
  };

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
              length: Number(cantidadJugadoresTwo),
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

            <button className={style.button} onClick={verjugadores}>
              Guardar Información
            </button>

          </>
        )}
        {/* vista terciaria despues de guardar la informacion completa del equipo (se muestra toda la informacion) */}
        {!conditionalInfo && (
          <article>
            <p>Nombre Equipo: {informacionTeamTwo.nombreEquipo}</p>
            {informacionTeamTwo.logo && (
              <img
                src={URL.createObjectURL(informacionTeamTwo.logo)}
                alt="Escudo del equipo"
                width={300}
              />
            )}
            <p>Alineación: {informacionTeamTwo.alineacion}</p>
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
  return (
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
  );
}

export default TeamTwo;
