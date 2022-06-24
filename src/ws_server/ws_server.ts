import Jimp from "jimp";
import ws from "ws";

import dataOperations from "./dataOperations";

const createWsServer = (envPort: string | undefined): void => {
  if (envPort !== undefined) {
    const wss: ws.WebSocketServer = new ws.WebSocketServer({ port: +envPort });

    wss.on("connection", dataOperations);

    wss.on("listening", () => {
      console.log(`Websocket server started on ${envPort} port\n`);
    });
  }
};

export default createWsServer;
