import { createStackNavigator } from "@react-navigation/stack";
import Home from "../telas/Home";
import Jogo from "../telas/Jogo";

const Stack = createStackNavigator()
export default function StackNavigator() {

    return (
        <Stack.Navigator
        >
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="jogo" component={Jogo} />

        </Stack.Navigator>
    )

}