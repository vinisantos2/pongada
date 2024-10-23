import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DIMENSAO, DIMENSAO_PONTO, ESPECURA } from "../constants/constants";
import { Posicao } from "../model/Jogo";

export default function ViewPonto({ click, posicao, id }) {

    return (

        <TouchableOpacity id={id} onPress={click} style={styles.ponto} >

        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({

    ponto: {
        width: DIMENSAO_PONTO,
        height: DIMENSAO_PONTO,
        borderWidth: 2,
        borderRadius: DIMENSAO_PONTO,
        backgroundColor: "#879"

    }
})