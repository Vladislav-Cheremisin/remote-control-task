import * as fs from "fs";
import * as path from "path";
import * as http from "http";

const httpServer: http.Server = http.createServer(async (req, res) => {
  try {
    let url: string;

    url = req.url === "/" ? "/front/index.html" : "/front" + req.url;

    const __dirname: string = path.resolve(path.dirname(""));
    const file_path: string = __dirname + url;
    const readable: fs.ReadStream = fs.createReadStream(file_path);

    readable.pipe(res);
    res.writeHead(200);

    readable.on("error", (err) => {
      res.writeHead(404);
      res.end(JSON.stringify(err));
    });
  } catch (err) {
    res.writeHead(404);
    res.end(JSON.stringify(err));
  }
});

const runHttpServer = (envPort: string | undefined): void => {
  if (envPort !== undefined) {
    httpServer.listen(+envPort, () => {
      console.log(`Static http server started on the ${envPort} port!`);
    });

    process.on("SIGINT", () => {
      httpServer.close();
      console.log(`Static http server on ${envPort} port was closed`);
    });
  }
};

export default runHttpServer;
