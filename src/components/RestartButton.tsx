// components/RestartButton.tsx
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

interface Props {
    onReset: () => void;
}

export default function RestartButton({ onReset }: Props) {
    return (
        <View style={styles.container}>
            <Button title="🔁 Novo Jogo" onPress={onReset} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
});
