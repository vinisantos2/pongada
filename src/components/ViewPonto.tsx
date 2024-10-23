import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DIMENSAO, DIMENSAO_PONTO, ESPECURA } from "../constants/constants";

export default function ViewPonto() {
    function clicou(){
        console.log("Clicou")

    }
    return (

        <TouchableOpacity onPress={()=>clicou()}style={styles.ponto}>

        </TouchableOpacity>
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