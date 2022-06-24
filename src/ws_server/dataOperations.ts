import stream from "stream";
import ws from "ws";

import userCounter from "../../utils/userCounter";
import mouseOps from "../mouseOperations";

const dataOperations = (wss: ws.WebSocket): void => {
  userCounter.userConnected();

  const wsStream: stream.Duplex = ws.createWebSocketStream(wss, {
    encoding: "utf-8",
    decodeStrings: false,
  });

  wsStream.on("data", async (data: Buffer) => {
    try {
      const commandDataArr = data.toString().split(" ");

      console.log(`received: ${data.toString()}`);

      switch (commandDataArr[0]) {
        case "mouse_up":
          mouseOps.mouseUp(+commandDataArr[1]);
          wsStream.write(commandDataArr[0]);
          break;
        case "mouse_down":
          mouseOps.mouseDown(+commandDataArr[1]);
          wsStream.write(commandDataArr[0]);
          break;
        case "mouse_left":
          mouseOps.mouseLeft(+commandDataArr[1]);
          wsStream.write(commandDataArr[0]);
          break;
        case "mouse_right":
          mouseOps.mouseRight(+commandDataArr[1]);
          wsStream.write(commandDataArr[0]);
          break;
        case "mouse_position":
          wsStream.write(mouseOps.getMousePosition());
          break;
        case "draw_circle":
          mouseOps.drawCircle(+commandDataArr[1]);
          wsStream.write(commandDataArr[0]);
          break;
        default:
          wsStream.write("incorrect_command");
      }
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
