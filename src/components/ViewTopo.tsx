import { StyleSheet, View } from "react-native";
import { arrayJogo, DIMENSAO, ESPECURA } from "../constants/constants";
import ViewPonto from "./ViewPonto";
import React from "react";
import { moviemtar } from "../jogo/movimentoJogo";

export default function ViewTopo() {


    return (
        <View style={styles.viewTopo}>
            <ViewPonto id={'1'}  posicao={arrayJogo[0]} click={() => moviemtar([1, 1])} key={"12"} />
            <View style={styles.horizontal} />
            <ViewPonto id={'2'}posicao={arrayJogo[1]} click={() => console.log("1,2")} />
            <View style={styles.horizontal} />
            <ViewPonto id={'3'} posicao={arrayJogo[2]} click={() => console.log("1,3")} />
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