import {  StyleSheet, View } from "react-native";


export default function Layout({ ...outros }) {

    return (
        <View style={styles.content} {...outros} />

    )

}

const styles = StyleSheet.create({
    content: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#587",
        height: "100%"
    }
})
