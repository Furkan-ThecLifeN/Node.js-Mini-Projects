import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const io = new Server(server);

// Static klasörü ayarla
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Socket.io bağlantısı
io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı:", socket.id);

  socket.on("chat message", (msg) => {
    // Mesajı tüm kullanıcılara gönder
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Kullanıcı ayrıldı:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Sunucu çalışıyor: http://localhost:3000");
});
