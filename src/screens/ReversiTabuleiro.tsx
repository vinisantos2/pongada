import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useReversi } from "../hooks/useReversi";
import ModalFimDeJogo from "../components/Modal";

export default function TabuleiroReversi() {
  const {
    tabuleiro,
    jogadorAtual,
    fimDeJogo,
    jogar,
    contarPecas,
    obterJogadasValidas,
    reinicarOjogo,
  } = useReversi();

  const { pretas, brancas } = contarPecas();
  const jogadasValidas = obterJogadasValidas();

  // Mensagem que aparece em cima do tabuleiro
  let mensagem = `Vez do: ${jogadorAtual === "P" ? "⚫ Preto" : "⚪ Branco"}`;
  if (fimDeJogo) {
    if (pretas > brancas) mensagem = "🏆 Vitória do ⚫ Preto!";
    else if (brancas > pretas) mensagem = "🏆 Vitória do ⚪ Branco!";
    else mensagem = "🤝 Empate!";
  }

  return (
    <View style={styles.tabuleiro}>
      {/* Modal de fim de jogo */}
      <ModalFimDeJogo
        visible={fimDeJogo}
        mensagem={
          pretas > brancas
            ? "🏆 Vitória do ⚫ Preto!"
            : brancas > pretas
            ? "🏆 Vitória do ⚪ Branco!"
            : "🤝 Empate!"
        }
        reiniciarJogo={reinicarOjogo}
      />

      {/* Placar */}
      <View style={{ marginBottom: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          ⚫ Preto: {pretas} ⚪ Branco: {brancas}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 5 }}>
          {mensagem}
        </Text>
      </View>

      {/* Tabuleiro */}
      {tabuleiro.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.map((celula, j) => {
            const ehJogadaValida = jogadasValidas.some(
              ([x, y]) => x === i && y === j
            );
            return (
              <TouchableOpacity
                key={j}
                style={[styles.celula, { backgroundColor: "#4CAF50" }]}
                onPress={() => jogar(i, j)}
              >
                {/* Peça */}
                {celula && (
                  <View
                    style={[
                      styles.peca,
                      { backgroundColor: celula === "P" ? "black" : "white" },
                    ]}
                  />
                )}
                {/* Marcador de jogada válida */}
                {!celula && ehJogadaValida && <View style={styles.marcador} />}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabuleiro: {
    alignItems: "center",
  },
  linha: {
    flexDirection: "row",
  },
  celula: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  peca: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  marcador: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "yellow", // cor de destaque
  },
});
