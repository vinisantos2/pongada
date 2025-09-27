import { useState } from "react";
import { TAMANHO } from "../utils/Constants";

type Jogador = "P" | "B";
type Vencedor = Jogador | "EMPATE" | null;

export function useReversi() {
  const [tabuleiro, setTabuleiro] = useState<(Jogador | null)[][]>(() =>
    inicializarTabuleiro()
  );
  const [jogadorAtual, setJogadorAtual] = useState<Jogador>("P");
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [winner, setWinner] = useState<Vencedor>(null); // ✅ agora pode ser jogador ou empate

  function inicializarTabuleiro(): (Jogador | null)[][] {
    const board: (Jogador | null)[][] = Array(TAMANHO)
      .fill(null)
      .map(() => Array(TAMANHO).fill(null));

    board[3][3] = "P";
    board[3][4] = "B";
    board[4][3] = "B";
    board[4][4] = "P";

    return board;
  }

  function reinicarOjogo() {
    setTabuleiro(inicializarTabuleiro());
    setJogadorAtual("P");
    setFimDeJogo(false);
    setWinner(null);
  }

  function direcoes(): [number, number][] {
    return [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
  }

  function podeJogar(
    board: (Jogador | null)[][],
    linha: number,
    coluna: number,
    jogador: Jogador
  ): boolean {
    if (board[linha][coluna]) return false;
    const oponente = jogador === "P" ? "B" : "P";

    for (const [dx, dy] of direcoes()) {
      let x = linha + dx;
      let y = coluna + dy;
      let encontrouOponente = false;

      while (x >= 0 && x < TAMANHO && y >= 0 && y < TAMANHO) {
        if (board[x][y] === oponente) {
          encontrouOponente = true;
        } else if (board[x][y] === jogador && encontrouOponente) {
          return true;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
    }
    return false;
  }

  function existeJogadaValida(board: (Jogador | null)[][], jogador: Jogador) {
    for (let i = 0; i < TAMANHO; i++) {
      for (let j = 0; j < TAMANHO; j++) {
        if (!board[i][j] && podeJogar(board, i, j, jogador)) {
          return true;
        }
      }
    }
    return false;
  }

  function jogar(linha: number, coluna: number) {
    if (fimDeJogo) return;
    if (!podeJogar(tabuleiro, linha, coluna, jogadorAtual)) return;

    const novoTabuleiro = tabuleiro.map((row) => [...row]);
    const oponente: Jogador = jogadorAtual === "P" ? "B" : "P";
    novoTabuleiro[linha][coluna] = jogadorAtual;

    for (const [dx, dy] of direcoes()) {
      let x = linha + dx;
      let y = coluna + dy;
      let pecasParaVirar: [number, number][] = [];

      while (x >= 0 && x < TAMANHO && y >= 0 && y < TAMANHO) {
        if (novoTabuleiro[x][y] === oponente) {
          pecasParaVirar.push([x, y]);
        } else if (novoTabuleiro[x][y] === jogadorAtual) {
          pecasParaVirar.forEach(([vx, vy]) => {
            novoTabuleiro[vx][vy] = jogadorAtual;
          });
          break;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
    }

    setTabuleiro(novoTabuleiro);

    const { pretas, brancas } = contarPecasTabuleiro(novoTabuleiro);
    if (pretas === 0 || brancas === 0) {
      finalizarJogo(pretas, brancas);
      return;
    }

    const proximoJogador: Jogador = jogadorAtual === "P" ? "B" : "P";
    if (!existeJogadaValida(novoTabuleiro, proximoJogador)) {
      if (!existeJogadaValida(novoTabuleiro, jogadorAtual)) {
        finalizarJogo(pretas, brancas);
        return;
      }
    } else {
      setJogadorAtual(proximoJogador);
    }
  }

  function contarPecasTabuleiro(board: (Jogador | null)[][]) {
    let pretas = 0;
    let brancas = 0;
    board.forEach((linha) =>
      linha.forEach((celula) => {
        if (celula === "P") pretas++;
        if (celula === "B") brancas++;
      })
    );
    return { pretas, brancas };
  }

  function contarPecas() {
    return contarPecasTabuleiro(tabuleiro);
  }

  function obterJogadasValidas(jogador: Jogador) {
    const jogadas: [number, number][] = [];
    for (let i = 0; i < TAMANHO; i++) {
      for (let j = 0; j < TAMANHO; j++) {
        if (podeJogar(tabuleiro, i, j, jogador)) {
          jogadas.push([i, j]);
        }
      }
    }
    return jogadas;
  }

  function finalizarJogo(pretas: number, brancas: number) {
    setFimDeJogo(true);
    if (pretas > brancas) setWinner("P");
    else if (brancas > pretas) setWinner("B");
    else setWinner("EMPATE");
  }

  return {
    tabuleiro,
    jogadorAtual,
    fimDeJogo,
    jogar,
    contarPecas,
    obterJogadasValidas: () => obterJogadasValidas(jogadorAtual),
    winner,
    reinicarOjogo,
  };
}
