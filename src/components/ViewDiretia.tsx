import { StyleSheet, View } from "react-native";
import { DIMENSAO, ESPECURA } from "../constants/constants";
import ViewPonto from "./ViewPonto";

export default function ViewDireita() {
    return (
        <View style={styles.viewDireita}>
            <View style={styles.vertical} />
            <ViewPonto click={() => console.log("2,3")}  />
            <View style={styles.vertical} />
        </View>
    )
}

const styles = StyleSheet.create({


    viewDireita: {
     

        alignItems: "center"
    },



    vertical: {
        borderWidth: 2,
        height: DIMENSAO,
        width: ESPECURA,
    },


})