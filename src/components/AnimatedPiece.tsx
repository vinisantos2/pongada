import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

type AnimatedPieceProps = {
    row: number;
    col: number;
    color: string; // "red" | "blue"
    size: number;
};

const CELL_SIZE = 80;

export default function AnimatedPiece({ row, col, color, size }: AnimatedPieceProps) {
    const x = useSharedValue(col * CELL_SIZE);
    const y = useSharedValue(row * CELL_SIZE);

    useEffect(() => {
        x.value = withTiming(col * CELL_SIZE, { duration: 300 });
        y.value = withTiming(row * CELL_SIZE, { duration: 300 });
    }, [row, col]);

    const animatedStyle = useAnimatedStyle(() => ({
        position: "absolute",
        transform: [
            { translateX: x.value },
            { translateY: y.value },
        ],
    }));

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    width: size,
                    height: size,
                    borderRadius: 100,
                    backgroundColor: color,
                },
            ]}
        />
    );
}
