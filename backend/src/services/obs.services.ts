import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

export async function connectOBS() {
  try {
    await obs.connect("ws://localhost:4455", "Hernan11");
    console.log("✅ Conectado a OBS");
  } catch (error) {
    console.error("❌ Error al conectar con OBS:", error);
  }
}

export { obs };