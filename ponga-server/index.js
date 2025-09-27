// Importa os módulos necessários
const express = require("express"); // Framework para servidor HTTP
const http = require("http");       // Módulo nativo para criar servidor
const { Server } = require("socket.io"); // WebSocket via Socket.IO
const cors = require("cors");       // Permite requisições de outras origens (CORS)

// Cria o app Express e aplica o middleware CORS
const app = express();
app.use(cors());

// Cria o servidor HTTP com suporte ao Express
const server = http.createServer(app);

// Instancia o servidor WebSocket com permissões CORS
const io = new Server(server, {
  cors: {
    origin: "*", // Permite qualquer origem (ideal restringir em produção)
  },
});

// Armazena os jogadores conectados e o estado do jogo
let players = {};    // Ex: { socketId: { id: socketId, color: 'R' or 'B' } }
let gameState = null; // Aqui você pode guardar o tabuleiro se quiser no futuro

// Evento de nova conexão
io.on("connection", (socket) => {
  console.log("Novo jogador conectado:", socket.id);

  // Verifica se ainda há espaço para mais jogadores (limite: 2)
  if (Object.keys(players).length < 2) {
    // Atribui uma cor com base nos jogadores já conectados
    const color = Object.values(players).some(p => p.color === 'R') ? 'B' : 'R';
    console.log(color)

    // Registra o jogador
    players[socket.id] = { id: socket.id, color };

    // Envia ao jogador sua cor e ID
    socket.emit("playerAssigned", {
      playerId: socket.id,
      color,
    });

    // Envia a lista de jogadores atualizada a todos os clientes
    io.emit("playersUpdate", Object.values(players));
  } else {
    // Se já houver dois jogadores, impede conexão
    socket.emit("full", "Sala cheia");
  }

  // Evento de jogada recebida de um jogador
  socket.on("move", (data) => {
    gameState = data; // Aqui você pode guardar o estado do jogo se quiser
    socket.broadcast.emit("move", data); // Envia a jogada para o outro jogador
  });

  // Evento de desconexão de um jogador
  socket.on("disconnect", () => {
    console.log("Jogador saiu:", socket.id);
    delete players[socket.id]; // Remove o jogador da lista
    io.emit("playersUpdate", Object.values(players)); // Atualiza os jogadores conectados
  });
});

// Inicia o servidor na porta 3001 (ou uma porta definida via variável de ambiente)
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor Ponga multiplayer rodando na porta ${PORT} 🚀`);
});
