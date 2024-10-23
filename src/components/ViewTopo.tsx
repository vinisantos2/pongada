import { StyleSheet, View } from "react-native";
import { DIMENSAO, ESPECURA } from "../constants/constants";
import ViewPonto from "./ViewPonto";

export default function ViewTopo() {
   
    return (
        <View style={styles.viewTopo}>
            <ViewPonto key={"12"} />
            <View style={styles.horizontal} />
            <ViewPonto />
            <View style={styles.horizontal} />
            <ViewPonto />
        </View>
    )
}

const styles = StyleSheet.create({

    viewTopo: {
        flexDirection: "row",
        alignItems: "center",
    },



    horizontal: {
        width: DIMENSAO,
        borderWidth: 2,
        height: ESPECURA
    },


})