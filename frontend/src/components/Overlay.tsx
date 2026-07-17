import Style from "./TeamOne.module.css";
import { socket } from "../sockets/sockets";
import { useState, useEffect } from "react";

function Overlay() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    socket.on("nuevo-dato-overlay", (data) => {
      setMensaje(data.mensaje);
    });
  }, []);

  return (
    <div>
      <p className={Style.nombreprueba}>{mensaje}</p>
    </div>
  );
}

export default Overlay;
