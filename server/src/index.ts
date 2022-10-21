import WebSocket from "ws"

const wss = new WebSocket.Server({ port: 8787 });

console.log("server listening...");

wss.on("connection", (ws: WebSocket.WebSocket) => {
  ws.on("message", (row: WebSocket.RawData) => {
    const payload = row.toString();

    const {user, message} = JSON.parse(payload);

    wss.clients.forEach((client: WebSocket.WebSocket) => {
      client.send(JSON.stringify({
        user: user,
        message: message,
      }));
    });

  });
});

