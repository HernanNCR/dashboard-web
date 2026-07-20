import Components from "./Components";
import styles from "./Dashboard.module.css";
import TeamOne from "./TeamOne";
import style from "./TeamOne.module.css";
import TeamTwo from "./TeamTwo";

function Dashboard() {
 

  return (
    <div className={styles.bodyNav}>
      
      <Components />

      <section className={style.tableEquipos}>
        {/* VISTA EQUIPO LOCAL */}
        <TeamOne />
        {/* VISTA EQUIPO VISITANTE */}
        <TeamTwo />
      </section>

    </div>
  );
}

export default Dashboard;
