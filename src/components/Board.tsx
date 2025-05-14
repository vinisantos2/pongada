// components/Board.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import Cell from './Cell';
import { Position, Player } from '../utils/Funcoes';

interface Props {
    board: (Player | null)[][];
    selected: Position | null;
    handlePress: (row: number, col: number) => void;
}

export default function Board({ board, selected, handlePress }: Props) {
    // Coordenadas para as trilhas (linhas)
    const cellCenters = [
        [45, 45], [135, 45], [225, 45],
        [45, 135], [135, 135], [225, 135],
        [45, 225], [135, 225], [225, 225],
    ];

    const connections = [
        [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
        [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8],
        [0, 4], [4, 8], [2, 4], [4, 6],
        [0, 2], [2, 8], [8, 6], [6, 0]
    ];

    return (
        <View style={styles.boardContainer}>
            {/* Trilhas */}
            <Svg height="270" width="270" style={StyleSheet.absoluteFill}>
                {connections.map(([from, to], index) => {
                    const [x1, y1] = cellCenters[from];
                    const [x2, y2] = cellCenters[to];
                    return (
                        <Line
                            key={index}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="green"
                            strokeWidth="3"
                        />
                    );
                })}
            </Svg>

            {/* Células */}
            <View style={styles.board}>
                {board.map((row, rIdx) => (
                    <View key={rIdx} style={styles.row}>
                        {row.map((cell, cIdx) => {
                            const isSelected = selected?.row === rIdx && selected?.col === cIdx;
                            return (
                                <Cell
                                    key={cIdx}
                                    position={{ row: rIdx, col: cIdx }}
                                    value={cell}
                                    isSelected={isSelected}
                                    onPress={() => handlePress(rIdx, cIdx)}
                                />
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boardContainer: {
        width: 270,
        height: 270,
        borderRadius: 15,
        backgroundColor: "#c1c1c1",
        marginBottom: 20,
        position: 'relative',
    },
    board: {
        position: 'absolute',
        width: 270,
        height: 270,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
