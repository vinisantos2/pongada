import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎮 Pongada</Text>
            <TouchableOpacity
                style={[styles.button, styles.aiButton]}
                onPress={() => navigation.navigate("Jogo", { modo: "ia" })}
            >
                <Text style={styles.buttonText}>Jogar contra IA</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.twoPlayerButton]}
                onPress={() => navigation.navigate("Jogo", { modo: "2p" })}
            >
                <Text style={styles.buttonText}>Jogar com 2 pessoas</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#e94560",
        marginBottom: 40,
    },
    button: {
        width: "80%",
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
    },
    aiButton: {
        backgroundColor: "#0f3460",
    },
    twoPlayerButton: {
        backgroundColor: "#16213e",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
