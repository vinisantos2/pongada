import { StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import BotaoView from "../components/BotaoView";
import { useNavigation } from "@react-navigation/native";


export default function Home({navigation}) {

    function nav(){
      
        navigation.navigate("jogo")
    }
    return (
        <Layout>

            <BotaoView onPress={()=> nav()} />


        </Layout>
    )
}

const styles = StyleSheet.create({
    content: { justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "#FFF" }
})