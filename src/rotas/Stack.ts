import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Tabuleiro from '../screens/Tabuleiro';
import { createStaticNavigation } from '@react-navigation/native';

const MyStack = createStackNavigator({
  screens: {
    Home: Home,
    Jogo: Tabuleiro,
  },
});

export const Navigation = createStaticNavigation(MyStack)