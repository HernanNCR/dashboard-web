import express from "express";
import { connectOBS } from "./services/obs.services";

import { createServer } from "http";
import { setupSocket } from "./sockets/sockets";


const app = express();


const httpServer = createServer(app);


setupSocket(httpServer);


httpServer.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});


// aprender a conectar el servidor para que funcione