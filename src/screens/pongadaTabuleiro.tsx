import { View, Text, StyleSheet } from "react-native";

import Board from "../components/Board";
import StatusBar from "../components/StatusBar";
import RestartButton from "../components/RestartButton";
import ModalFimDeJogo from "../components/Modal";
import { usePongada } from "../hooks/usePongada";

export default function TabuleiroPongada() {
  const {
    myColor,
    board,
    selected,
    currentPlayer,
    winner,
    modo,
    reiniciarJogo,
    handlePress,
  } = usePongada();

  return (
    <View style={styles.container}>
      <ModalFimDeJogo
        visible={!!winner}
        mensagem={winner === myColor ? "🏆 Você venceu!" : "❌ Você perdeu!"}
        reiniciarJogo={reiniciarJogo}
      />

      <Text style={styles.title}>
        🎯 Jogo de Ponga ({modo === "ia" ? "IA" : "2 Jogadores"})
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Você é: {myColor} │ Vez de: {currentPlayer}
      </Text>
      <StatusBar
        winner={winner}
        currentPlayer={currentPlayer}
        selected={selected}
      />

      <Board board={board} selected={selected} handlePress={handlePress} />

      <RestartButton onReset={reiniciarJogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
