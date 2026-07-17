import Dashboard from "./components/Dashboard";
import TeamOne from "./components/TeamOne";
import style from "./App.module.css";
import TeamTwo from "./components/TeamTwo";
import OthersComponents from "./components/OthersComponents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overlay from "./components/Overlay";

function App() {
  return (
    <div>
      {/* <Dashboard />
      <OthersComponents/> */}

      {/* <div className={style.StyleTeams}>
        <TeamOne/>
        <TeamTwo/>
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/overlay" element={<Overlay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
