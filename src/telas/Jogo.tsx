import { StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import BotaoView from "../components/BotaoView";
import { useState } from "react";
import ViewBase from "../components/ViewBase";
import ViewDireita from "../components/ViewDiretia";
import ViewEsquerda from "../components/ViewEsquerda";
import ViewTopo from "../components/ViewTopo";
import ViewCentro from "../components/ViewCentro";
import ViewInclinado from "../components/ViewInclinado";
import { ROTATE } from "../constants/constants";

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
                setP2(!p2)
                setP1(!p1)
                break;

            case "p2":
                setP2(!p2)
                setP1(!p1)
                break;
        }

    }

    return (
        <Layout>
            <View style={styles.viewJogo}>
                <ViewTopo />

                <View style={styles.viewCentro}>
                    <ViewEsquerda />
                    <View>
                        <ViewInclinado rotate={"-" + ROTATE + "deg"} />
                        <ViewInclinado rotate={ROTATE + "deg"} />
                    </View>

                    <ViewCentro />
                    <View>
                        <ViewInclinado rotate={ROTATE + "deg"} />
                        <ViewInclinado rotate={"-" + ROTATE + "deg"} />
                    </View>
                    <ViewDireita />
                </View>

                <ViewBase />

            </View>

        </Layout>
    )
}

const styles = StyleSheet.create({


    viewCentro: {
        width: "96%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"

    },

    viewJogo: {
        alignItems: "center",
     
        justifyContent: "center",

    },

})