import runHttpServer from "./src/http_server/server";
import createWsServer from "./src/ws_server/ws_server";

import dotenv from "dotenv";

dotenv.config();
runHttpServer(process.env.HTTP_PORT);
createWsServer(process.env.WS_PORT);
