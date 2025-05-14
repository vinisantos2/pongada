// components/StatusBar.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Player, Position } from '../utils/Funcoes';

interface Props {
    winner: Player | null;
    currentPlayer: Player;
    selected: Position | null;
}

export default function StatusBar({ winner, currentPlayer, selected }: Props) {
    if (winner) {
        return (
            <Text style={styles.status}>
                🏆 {winner === 'R' ? '🔴 Vermelho' : '🔵 Azul'} venceu!
            </Text>
        );
    }

    return (
        <Text style={styles.status}>
            {selected ? 'Selecione destino' : `Vez de: ${currentPlayer === 'R' ? '🔴 Vermelho' : '🔵 Azul'}`}
        </Text>
    );
}

const styles = StyleSheet.create({
    status: {
        fontSize: 18,
        marginBottom: 20,
    },
});
