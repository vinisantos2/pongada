import { StyleSheet, View } from "react-native";
import { DIMENSAO, ESPECURA } from "../constants/constants";
import ViewPonto from "./ViewPonto";

export default function ViewInclinado({ rotate }) {
    return (

        <View style={[styles.vertical, { transform: [{ rotate: rotate }], }]} />

    )
}

const styles = StyleSheet.create({

    vertical: {
        borderWidth: 2,
        height: 150,
        width: ESPECURA,
    },


})