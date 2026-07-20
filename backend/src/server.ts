import express from "express";
import {createServer} from "http";
import {setupSocket} from "./sockets/sockets";

const app = express();

const httpServer = createServer(app);

setupSocket(httpServer);

httpServer.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});