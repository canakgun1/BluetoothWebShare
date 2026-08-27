const WebSocket = require("ws");

const server = new WebSocket.Server({port: 8080});

let clients = [];

server.on("connection", (socket) => {
    console.log("Servera bağlanan var");

    clients.push(socket);

    socket.on("message", (message) => {
        console.log("Gelen mesaj", message.toString());
        for (const client of clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });
    socket.on("close", () => {
        console.log("Serverdan çıkan var");

        clients = clients.filter(client => client !== socket);
    })
});

console.log("Port 8080'de çalışıyoruz.");