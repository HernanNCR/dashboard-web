import style from "./Dashboard.module.css";

function Components() {
  return (
    <div className={style.bodyNav}>
      <center>
        <h1>OBS Dashboard Controller</h1>
      </center>

      <section>
        <p>Selecciona tu logo</p>
        <input type="file" accept="image/*" />
      </section>
      <article>
        <p>Agrega Jornada</p>
        <input type="text" placeholder={"Jornada x"} />
      </article>
    </div>
  );
}

export default Components;
