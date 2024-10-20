import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Layout({ ...outros }) {

    return (
        <View style={styles.content} {...outros} />

    )

}

const styles = StyleSheet.create({
    content: {

        flex: 1,
        backgroundColor: "#808000"
    }
})
