import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import TabuleiroPongada from '../screens/pongadaTabuleiro';
import { createStaticNavigation } from '@react-navigation/native';
import TabuleiroReversi from '../screens/ReversiTabuleiro';

const MyStack = createStackNavigator({
  screens: {
    Home: Home,
    pongada: TabuleiroPongada,
    reversi: TabuleiroReversi,
  },
});

export const Navigation = createStaticNavigation(MyStack)