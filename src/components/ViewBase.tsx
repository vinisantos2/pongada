import { StyleSheet, View } from "react-native";
import { DIMENSAO, ESPECURA } from "../constants/constants";
import ViewPonto from "./ViewPonto";

export default function ViewBase() {
    return (
        <View style={styles.viewBase}>
            <ViewPonto />
            <View style={styles.horizontal} />
            <ViewPonto />
            <View style={styles.horizontal} />
            <ViewPonto />
        </View>
    )
}

const styles = StyleSheet.create({



    viewBase: {
        flexDirection: "row",
        alignItems: "center",
       
    },



    horizontal: {
        width: DIMENSAO,
        borderWidth: 2,
        height: ESPECURA
    },


})