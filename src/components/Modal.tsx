// components/ModalFimDeJogo.tsx
import { Button, Text, View, Modal as RNModal } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  visible: boolean;          // controla a visibilidade
  mensagem: string;          // mensagem de fim de jogo (vitória, derrota, empate, etc)
  reiniciarJogo: () => void; // ação para novo jogo
}

export default function ModalFimDeJogo({ visible, mensagem, reiniciarJogo }: Props) {
  const navigation = useNavigation();

  return (
    <RNModal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 24,
            borderRadius: 12,
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
            {mensagem}
          </Text>

          <Button title="🔁 Novo Jogo" onPress={reiniciarJogo} />
          <View style={{ height: 10 }} />
          <Button title="🏠 Voltar ao Menu" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </RNModal>
  );
}
