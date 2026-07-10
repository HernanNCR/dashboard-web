import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.bodyNav}>
      <center>
        <h1>OBS Dashboard Controller</h1>
      </center>
      
      <section>
        <p>Selecciona tu logo</p>
        <input type="file" accept="image/*"  />
      </section>
    </div>
  );
}

export default Dashboard;
