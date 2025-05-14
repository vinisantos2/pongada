
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { checkWinner, createInitialBoard, isAdjacent, Player, Position } from "../utils/Funcoes";
import { makeAIMove } from "../utils/Ia";

import Board from "../components/Board";
import StatusBar from "../components/StatusBar";
import RestartButton from "../components/RestartButton";
import { useRoute } from "@react-navigation/native";
//import useAudio from "../hooks/useAudio"; // Importando o hook de áudio



export default function Tabuleiro() {
    const [board, setBoard] = useState(createInitialBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('R');
    const [selected, setSelected] = useState<Position | null>(null);
    const [winner, setWinner] = useState<Player | null>(null);

    // Pegando o modo de jogo da rota (ia ou 2p)
    const route = useRoute();
    const modo = route.params?.modo ?? "2p"; // padrão: 2 jogadores

    // Sons
    //const { playMoveSound, playWinSound } = useAudio(); // Usando o hook de áudio

    const resetGame = () => {
        setBoard(createInitialBoard());
        setCurrentPlayer('R');
        setSelected(null);
        setWinner(null);
    };

    const handlePress = (row: number, col: number) => {
        if (winner) return;

        const cell = board[row][col];

        if (selected) {
            const from = selected;
            const to = { row, col };

            if (
                board[from.row][from.col] === currentPlayer &&
                board[to.row][to.col] === null &&
                isAdjacent(from, to)
            ) {
                const newBoard = board.map(r => [...r]);
                newBoard[to.row][to.col] = currentPlayer;
                newBoard[from.row][from.col] = null;
                setBoard(newBoard);
                setSelected(null);

                // Tocar som de movimento
             //   playMoveSound();

                if (checkWinner(newBoard, currentPlayer)) {
                    setWinner(currentPlayer);
                   // playWinSound(); // Tocar som de vitória
                } else {
                    setCurrentPlayer(currentPlayer === 'R' ? 'B' : 'R');
                }
            } else {
                if (cell === currentPlayer) {
                    setSelected({ row, col });
                } else {
                    setSelected(null);
                }
            }
        } else {
            if (cell === currentPlayer) {
                setSelected({ row, col });
            }
        }
    };

    //movimento automatico da ia
    useEffect(() => {
        if (modo === "ia" && currentPlayer === 'B' && !winner) {
            const timer = setTimeout(() => {
                makeAIMove(board, setBoard, setCurrentPlayer, setWinner);
            }, 500); // espera 0.5s para parecer mais "natural"
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, board, winner]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎯 Jogo de Ponga ({modo === "ia" ? "IA" : "2 Jogadores"})</Text>

            <StatusBar
                winner={winner}
                currentPlayer={currentPlayer}
                selected={selected}
            />

            <Board
                board={board}
                selected={selected}
                handlePress={handlePress}
            />

            <RestartButton onReset={resetGame} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 30,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});
