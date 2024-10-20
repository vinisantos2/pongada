import { StyleSheet, Text } from "react-native";


export default function TextView({ valor }) {

    return (
        <Text style={{ fontSize: 20, color: "#FFF" }}>
            {valor}
        </Text>
    )

}

const styles = StyleSheet.create({
    botao: {
        width: "80%",
        backgroundColor: "#19160F"
    }

})