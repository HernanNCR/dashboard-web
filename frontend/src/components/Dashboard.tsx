import styles from "./Dashboard.module.css";
import { socket } from "../sockets/sockets";

function Dashboard() {
  return (
    <div className={styles.bodyNav}>
      <center>
        <h1>OBS Dashboard Controller</h1>
      </center>

      <section>
        <p>Selecciona tu logo</p>
        <input type="file" accept="image/*" />
      </section>
      <button
        onClick={() => {
          socket.emit("actualizar-overlay", {
            mensaje: "Hola desde Dashboard",
          });
        }}
      >
        Enviar a Overlay
      </button>
    </div>
  );
}

export default Dashboard;
