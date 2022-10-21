import WebSocket from "ws"

const wss = new WebSocket.Server({ port: 8787 });

type Chat = {
  userId: string,
  message: string
}

// インメモリでデータを保持
const chatBoard: Chat[] = [];

wss.on("connection", (ws: WebSocket.WebSocket) => {
  ws.on("message", (payload: WebSocket.RawData) => {
    if (typeof payload === "string") {
      chatBoard.push(JSON.parse(payload));
    }

    // 全ての接続先に送信
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(chatBoard));
    })
  });

  ws.send(JSON.stringify(chatBoard));
});

