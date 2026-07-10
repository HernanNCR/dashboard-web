import style from "./TeamOne.module.css";

function TeamTwo() {
  return (
    <div className={style.teamOne}>
      <section>
        <p>
          Nombre del Equipo Visitante. Solo permitido 3 Letras como en el
          ejemplo
        </p>
        <input type="text" max={3} />
      </section>
      <section>
        <p>Logo del Equipo Visitante</p>
        <input type="file" accept="image/*" />
      </section>
      <section>
        <p>Cantidad de jugadores del Equipo</p>
        <input type="number" max={22} />
      </section>
      <section>
        <p>Seleccionar Alineación</p>
        <select>
          <option></option>
          <option value="">4-4-2</option>
          <option value="">5-3-1</option>
          <option value="">3-4-1-2</option>
        </select>
      </section>
    </div>
  );
}

export default TeamTwo;
