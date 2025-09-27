import { useEffect, useState } from "react";
import {
  checkWinner,
  createInitialBoard,
  isAdjacent,
  Player,
  Position,
} from "../utils/Funcoes";
import socket from "../utils/socket";
import { makeAIMove } from "../utils/Ia";
import { useRoute } from "@react-navigation/native";

export function usePongada() {
  const estadoInicialDoTabuleiro = [
    ["R", "R", "R"],
    [null, null, null],
    ["B", "B", "B"],
  ];

  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("R");
  const [selected, setSelected] = useState<Position | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [myColor, setMyColor] = useState<Player | null>(null);
  // Pegando o modo de jogo da rota (ia ou 2p)
  const route = useRoute();
  const modo = route.params?.modo ?? "2p"; // padrão: 2 jogadores

  useEffect(() => {
    // Força conexão caso ainda não esteja conectando
    console.log("Socket conectado?", socket.connected);
    if (!socket.connected) socket.connect();

    socket.on("connect", () => {
      console.log("Conectado ao servidor multiplayer");
    });

    socket.on("playerAssigned", ({ playerId: id, color }) => {
      console.log("Cor atribuída:", color);
      console.log("ID do jogador:", id);
      playerId.current = id;
      setMyColor(color);
    });

    socket.on("move", (data) => {
      if (data.reset) {
        reiniciarJogo();
        return;
      }

      const { from, to, player } = data;

      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((row) => [...row]);
        newBoard[to.row][to.col] = player;
        newBoard[from.row][from.col] = null;

        if (checkWinner(newBoard, player)) {
          setWinner(player);
        } else {
          setCurrentPlayer(player === "R" ? "B" : "R");
        }

        return newBoard;
      });

      setSelected(null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  //movimento automatico da ia
  useEffect(() => {
    if (modo === "ia" && currentPlayer === "B" && !winner) {
      const timer = setTimeout(() => {
        makeAIMove(board, setBoard, setCurrentPlayer, setWinner);
      }, 500); // espera 0.5s para parecer mais "natural"
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, winner]);

  const reiniciarJogo = () => {
    setBoard(estadoInicialDoTabuleiro);
    setWinner(null);
    setCurrentPlayer("R");
    setSelected(null);
    socket.emit("move", { reset: true }); // avisa o outro jogador
  };

  const handlePress = (row: number, col: number) => {
    if (winner) return; // Se já houver um vencedor, ignora o toque

    const cell = board[row][col]; // Pega o conteúdo da célula clicada

    if (selected) {
      // Já tem uma peça selecionada — o jogador quer mover
      const from = selected; // Posição original da peça
      const to = { row, col }; // Nova posição desejada

      // Verifica se o movimento é válido:
      // - a peça selecionada pertence ao jogador atual
      // - a célula de destino está vazia
      // - a movimentação é para uma célula adjacente
      if (
        board[from.row][from.col] === currentPlayer &&
        board[to.row][to.col] === null &&
        isAdjacent(from, to)
      ) {
        // Cria uma cópia do tabuleiro
        const newBoard = board.map((r) => [...r]);

        // Move a peça no tabuleiro
        newBoard[to.row][to.col] = currentPlayer;
        newBoard[from.row][from.col] = null;

        // Atualiza o estado com o novo tabuleiro
        setBoard(newBoard);

        // Limpa a seleção atual
        setSelected(null);

        // 🔁 Envia a jogada para o outro jogador via Socket.IO
        socket.emit("move", {
          from,
          to,
          player: currentPlayer,
        });

        // Verifica se o jogador venceu com essa jogada
        if (checkWinner(newBoard, currentPlayer)) {
          setWinner(currentPlayer);
          // Som de vitória poderia ser tocado aqui
        } else {
          // Troca para o próximo jogador
          setCurrentPlayer(currentPlayer === "R" ? "B" : "R");
        }
      } else {
        // Se clicou em outra peça da sua cor, troca a seleção
        if (cell === currentPlayer) {
          setSelected({ row, col });
        } else {
          // Senão, cancela a seleção
          setSelected(null);
        }
      }
    } else {
      // Nenhuma peça selecionada ainda
      // Se o jogador tocou em uma peça da sua cor, seleciona ela
      if (cell === currentPlayer) {
        setSelected({ row, col });
      }
    }
  };

  return {
    board,
    currentPlayer,
    selected,
    winner,
    myColor,
    modo,
    handlePress,
    reiniciarJogo,
  };
}
