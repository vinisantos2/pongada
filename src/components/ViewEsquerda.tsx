import { StyleSheet, View } from "react-native";
import { DIMENSAO, ESPECURA } from "../constants/constants";
import ViewPonto from "./ViewPonto";

export default function ViewEsquerda() {
    return (
        <View style={styles.viewEsquerda}>
            <View style={styles.vertical} />
            <ViewPonto />
            <View style={styles.vertical} />
        </View>
    )
}

const styles = StyleSheet.create({


    viewEsquerda: {

        alignItems: "center",
       
    },



    vertical: {
        borderWidth: 2,
        height: DIMENSAO,
        width: ESPECURA,
    },


})