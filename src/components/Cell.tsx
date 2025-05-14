// components/Cell.tsx
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Player, Position } from '../utils/Funcoes';

interface Props {
    position: Position;
    value: Player | null;
    isSelected: boolean;
    onPress: () => void;
}

export default function Cell({ value, isSelected, onPress }: Props) {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (value) {
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [value]);

    const getBackgroundColor = () => {
        if (value === 'R') return '#e94560';
        if (value === 'B') return '#0f3460';
        return '#fff';
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Animated.View style={[styles.cell, {
                transform: [{ scale }],
                backgroundColor: getBackgroundColor(),
                borderColor: isSelected ? '#000' : '#ccc',
            }]} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cell: {
        width: 70,
        height: 70,
        margin: 10,
        backgroundColor: "#FFF",
        borderRadius: 100,
        borderWidth: 2,
    },
});
