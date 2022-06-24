import stream from "stream";
import ws from "ws";

import userCounter from "../../utils/userCounter";

const dataOperations = (wss: ws.WebSocket): void => {
  userCounter.userConnected();

  const wsStream: stream.Duplex = ws.createWebSocketStream(wss, {
    encoding: "utf-8",
    decodeStrings: false,
  });

  wsStream.on("data", async (data: Buffer) => {
    try {
      console.log(data.toString());
    } catch (err) {
      console.log(
        "Something wrong happened with server. Please restart server or contact with me: vladislav@cheremis.in"
      );
    }
  });

  wss.on("close", () => {
    userCounter.userDisconnected();
    wsStream.destroy();
  });
};

export default dataOperations;
