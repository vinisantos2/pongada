export type Player = 'R' | 'B' | null;
export type Position = { row: number; col: number };

export const createInitialBoard = (): Player[][] => [
    ['R', 'R', 'R'],
    [null, null, null],
    ['B', 'B', 'B'],
];

const allowedConnections: [Position, Position][] = [
    // Horizontais
    [{ row: 0, col: 0 }, { row: 0, col: 1 }],
    [{ row: 0, col: 1 }, { row: 0, col: 2 }],
    [{ row: 1, col: 0 }, { row: 1, col: 1 }],
    [{ row: 1, col: 1 }, { row: 1, col: 2 }],
    [{ row: 2, col: 0 }, { row: 2, col: 1 }],
    [{ row: 2, col: 1 }, { row: 2, col: 2 }],

    // Verticais
    [{ row: 0, col: 0 }, { row: 1, col: 0 }],
    [{ row: 1, col: 0 }, { row: 2, col: 0 }],
    [{ row: 0, col: 1 }, { row: 1, col: 1 }],
    [{ row: 1, col: 1 }, { row: 2, col: 1 }],
    [{ row: 0, col: 2 }, { row: 1, col: 2 }],
    [{ row: 1, col: 2 }, { row: 2, col: 2 }],

    // Diagonais centrais
    [{ row: 0, col: 0 }, { row: 1, col: 1 }],
    [{ row: 1, col: 1 }, { row: 2, col: 2 }],
    [{ row: 0, col: 2 }, { row: 1, col: 1 }],
    [{ row: 1, col: 1 }, { row: 2, col: 0 }],

    // // Ligações diretas de canto a canto
    // [{ row: 0, col: 0 }, { row: 0, col: 2 }],
    // [{ row: 0, col: 2 }, { row: 2, col: 2 }],
    // [{ row: 2, col: 2 }, { row: 2, col: 0 }],
    // [{ row: 2, col: 0 }, { row: 0, col: 0 }],
];


export function isAdjacent(from: Position, to: Position): boolean {
    return allowedConnections.some(
        ([a, b]) =>
            (a.row === from.row && a.col === from.col && b.row === to.row && b.col === to.col) ||
            (b.row === from.row && b.col === from.col && a.row === to.row && a.col === to.col)
    );
}

export const checkWinner = (board: Player[][], player: Player): boolean => {
    // Centro centro
    if (board[1][0] === player && board[1][1] === player && board[1][2] === player) return true;
    // Centro vertical
    if (board[0][1] === player && board[1][1] === player && board[2][1] === player) return true;
    // Diagonal principal
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    // Diagonal secundária
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    //primeira vertival
    if (board[0][0] === player && board[1][0] === player && board[2][0] === player) return true;
    //segunda vertical
    if (board[0][2] === player && board[1][2] === player && board[2][2] === player) return true;
    return false;
};




