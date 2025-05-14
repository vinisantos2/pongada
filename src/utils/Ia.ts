import { Player, Position, isAdjacent, checkWinner } from './Funcoes';

// Função principal que executa a jogada da IA
export function makeAIMove(
  board: Player[][],
  setBoard: (b: Player[][]) => void,
  setCurrentPlayer: (p: Player) => void,
  setWinner: (p: Player | null) => void
) {
  const aiPlayer: Player = 'B';       // IA joga com as peças azuis
  const humanPlayer: Player = 'R';    // Jogador humano usa as vermelhas

  // Busca todas as posições em que um jogador específico está no tabuleiro
  const getPlayerPositions = (player: Player): Position[] => {
    const positions: Position[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === player) {
          positions.push({ row, col });
        }
      }
    }
    return positions;
  };

  // Retorna uma nova cópia do tabuleiro com a movimentação simulada
  const simulateMove = (from: Position, to: Position, player: Player): Player[][] => {
    const newBoard = board.map(row => [...row]); // copia o tabuleiro
    newBoard[from.row][from.col] = null;         // remove peça da posição original
    newBoard[to.row][to.col] = player;           // coloca peça na nova posição
    return newBoard;
  };

 const findBestMove = (): { from: Position; to: Position } | null => {
  const aiPieces = getPlayerPositions(aiPlayer);
  const humanPieces = getPlayerPositions(humanPlayer);

  const center: Position = { row: 1, col: 1 };
  const corners: Position[] = [
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 },
  ];

  // 1. Tenta vencer
  for (const from of aiPieces) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const to = { row: r, col: c };
        if (board[r][c] === null && isAdjacent(from, to)) {
          const temp = simulateMove(from, to, aiPlayer);
          if (checkWinner(temp, aiPlayer)) {
            return { from, to };
          }
        }
      }
    }
  }

  // 2. Tenta bloquear o adversário
  for (const from of aiPieces) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const to = { row: r, col: c };
        if (board[r][c] === null && isAdjacent(from, to)) {
          const temp = simulateMove(from, to, aiPlayer);
          if (checkWinner(temp, humanPlayer)) {
            return { from, to };
          }
        }
      }
    }
  }

  // 3. Tenta pegar o centro
  for (const from of aiPieces) {
    if (board[center.row][center.col] === null && isAdjacent(from, center)) {
      return { from, to: center };
    }
  }

  // 4. Tenta pegar os cantos
  for (const from of aiPieces) {
    for (const to of corners) {
      if (board[to.row][to.col] === null && isAdjacent(from, to)) {
        return { from, to };
      }
    }
  }

  // 5. Qualquer movimento válido
  const possibleMoves: { from: Position; to: Position }[] = [];
  for (const from of aiPieces) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const to = { row: r, col: c };
        if (board[r][c] === null && isAdjacent(from, to)) {
          possibleMoves.push({ from, to });
        }
      }
    }
  }

  if (possibleMoves.length > 0) {
    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  return null;
};

  // Executa a jogada escolhida
  const move = findBestMove();
  if (move) {
    const updatedBoard = simulateMove(move.from, move.to, aiPlayer);
    setBoard(updatedBoard); // atualiza o tabuleiro

    if (checkWinner(updatedBoard, aiPlayer)) {
      setWinner(aiPlayer); // IA venceu
    } else {
      setCurrentPlayer(humanPlayer); // passa a vez pro jogador humano
    }
  }
}
