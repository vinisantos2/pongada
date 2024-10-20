import { StyleSheet, Text, TouchableOpacity } from "react-native";
import TextView from "./TextView";


export default function BotaoView({onPress}) {

    return (
        <TouchableOpacity onPress={onPress} style={styles.botao}>
            <TextView valor={"Play"} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    botao: {
        width: "90%",
        backgroundColor: "#19160F",
        padding: 20,
        alignItems: "center",
        borderRadius: 20
    }

})