import Dashboard from "./components/Dashboard";
import TeamOne from "./components/TeamOne";
import style from "./App.module.css";
import TeamTwo from "./components/TeamTwo";
import OthersComponents from "./components/OthersComponents";

function App() {
  return (
    <div>
      <Dashboard />
      <OthersComponents/>

      <div className={style.StyleTeams}>
        <TeamOne/>
        <TeamTwo/>
      </div>
      
      

    </div>
  );
}

export default App;
