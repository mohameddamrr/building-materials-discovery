import { app } from "./app.js";

const DEFAULT_PORT = 3001;
const port = readPort(process.env.PORT);

const server = app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

function shutdown(signal: NodeJS.Signals) {
  console.log(`${signal} received. Closing the API server.`);
  server.close((error) => {
    if (error) {
      console.error("The API server did not close cleanly.", error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function readPort(value: string | undefined): number {
  if (value === undefined) {
    return DEFAULT_PORT;
  }

  const parsedPort = Number(value);

  if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65_535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  return parsedPort;
}

