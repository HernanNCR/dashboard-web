import { useState } from "react";
import { socket } from "../sockets/sockets";
import style from "./TeamOne.module.css";

function TeamTwo() {
  interface Equipo {
    nombreEquipo: string;
    logo: File | null;
    logoPreview: string;
    alineacion: string;
  }
  interface Jugador {
    nombre: string;
    numero: string;
  }

  // ------------------ //
  //  EQUIPO VISITANTE  //
  // ------------------ //
  const [informacionTeamTwo, setinformacionTeamTwo] = useState<Equipo>({
    nombreEquipo: "",
    logo: null,
    logoPreview:"",
    alineacion: "",
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


  const [cantidadJugadoresTeamTwo, setcantidadJugadoresTeamTwo] = useState({});
  const [buttonTeamTwo, setbuttonTeamTwo] = useState(true);

  const changeCantidadTeamoTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setcantidadJugadoresTeamTwo(value);
    setbuttonTeamTwo(false);
  };

  // SelectChange guarda informacion del select de alineación
  const SelectChangeTeamTwo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setinformacionTeamTwo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [Modal2, setModal2] = useState(true);

  const verInfo2 = () => {
    setModal2(false);
  };

  const [datosJugadoresTeamTwo, setDatosJugadoresTeamTwo] = useState<Jugador[]>([]);

  const guardarNombreTeamTwo = (
    index: number,
    campo: "nombre" | "numero",
    valor: string,
  ) => {
    setDatosJugadoresTeamTwo((prev) => {
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

  

  // Boton para enviar mensaje a overlay
  const Onclick2 = () => {
    socket.emit("actualizar-overlay-equipo-visitante", {
      mensaje: informacionTeamTwo,
      jugadoresVisitante: datosJugadoresTeamTwo,
    });
  };

  return (
    
        <div className={style.teamOne}>
          {/* VISTA EQUIPO VISITANTE */}
          <section>
            <p>
              Nombre del Equipo Visitante
            </p>
            <input
              type="text"
              maxLength={3}
              name="nombreEquipo"
              onChange={InputChangeTeamTwo}
            />
          </section>
          <section>
            <p>Logo del Equipo Visitante</p>
            <input
              type="file"
              accept="image/*"
              name="logo"
              onChange={InputChangeTeamTwo}
            />
          </section>
          <section>
            <p>Cantidad de jugadores del Equipo</p>
            <input type="number" max={22} onChange={changeCantidadTeamoTwo} />
          </section>
          <section>
            <p>Seleccionar Alineación</p>
            <select name="alineacion" onChange={SelectChangeTeamTwo}>
              <option></option>
              <option value="4-4-2">4-4-2</option>
              <option value="5-3-1">5-3-1</option>
              <option value="3-4-1-2">3-4-1-2</option>
            </select>
          </section>
          {!buttonTeamTwo && (
            <button className={style.button} onClick={verInfo2}>
              Siguiente
            </button>
          )}

          {!Modal2 && (
            <section className={style.modalTeam}>
              <h1 className={style.titleModal}>
                Ingrese Nombre de los jugadores y número
              </h1>
              <br />
              {Array.from({
                length: Number(cantidadJugadoresTeamTwo),
              }).map((_, index) => (
                <article key={index}>
                  <input
                    type="text"
                    placeholder={`Jugador ${index + 1}`}
                    name={`Jugador ${index + 1}`}
                    onChange={(e) =>
                      guardarNombreTeamTwo(index, "nombre", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className={style.numberPlayer}
                    name={`Numero jugador ${index + 1}`}
                    placeholder="22"
                    onChange={(e) =>
                      guardarNombreTeamTwo(index, "numero", e.target.value)
                    }
                  />
                </article>
              ))}

              <button className={style.button} onClick={Onclick2}>
                Guardar Información
              </button>

              {/* <button
                onClick={cambiarValorDeInstruccion}
                className={style.button}
              >
                {" "}
                Ver nombre de equipos
              </button>
              <button
                onClick={cambiarValorDeInstruccion}
                className={style.button}
              >
                Ver jugadores
              </button> */}
            </section>
          )}
        </div>
  );
}

export default TeamTwo;
