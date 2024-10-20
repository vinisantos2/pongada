import { StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import BotaoView from "../components/BotaoView";
import { useState } from "react";

const DIMENSAO = 150
const ESPECURA = 10

export default function Jogo() {
    const [mudaCor, setMudaCor] = useState("#FFF")
    const [p1, setP1] = useState(true)
    const [e1, setE1] = useState(false)
    const [p2, setP2] = useState(false)
    const [e2, setE2] = useState(true)
    const [c2, setC2] = useState(true)

    function verificarPosicao() {

    }

    function mudarPedra(p) {

        switch (p) {
            case "p1":
                
                break;
        }

    }

    return (
        <Layout>
            <View style={styles.viewJogo}>

                <View style={[styles.viewEsquerda]}>
                    <View onTouchStart={() => mudarPedra('p1')} style={[p1 ? styles.viewPedra : styles.ponto]} />
                    <View style={[styles.vertical,]} />
                    <View style={[[p2 ? styles.viewPedra : styles.ponto]]} />
                    <View style={styles.vertical} />
                </View>
                <View style={styles.viewBase}>
                    <View onTouchStart={(e) => setMudaCor("#F2EC8E")} style={[styles.ponto, { backgroundColor: mudaCor }]} />
                    <View style={styles.horizontal} />
                    <View onTouchStart={(e) => setMudaCor("#F2EC8E")} style={[styles.ponto, { backgroundColor: mudaCor }]} />
                </View>

            </View>


        </Layout>
    )
}

const styles = StyleSheet.create({
    viewEsquerda: {
        alignItems: "center",
        backgroundColor: "#808000"
    },
    viewBase: {
        flexDirection: "row",
        alignItems: "center"
    },
    vertical: {
        borderWidth: 2,
        height: DIMENSAO,
        width: ESPECURA,
        // transform: [{rotate: '45deg'}]
    },
    viewPedra: {
        height: 50,
        width: 50,
        backgroundColor: "#000",

    },
    horizontal: {
        width: DIMENSAO,
        borderWidth: 2,
        height: ESPECURA
    },

    viewJogo: {
        alignItems: "flex-start"
    },

    ponto: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 50

    }
})