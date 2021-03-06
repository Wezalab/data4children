import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Browse from "../screens/Browse";
import ErrorScreen from "../screens/ErrorScreen";
import Compte from "../screens/Compte";

const AppStackNavigator = createStackNavigator ({
    Welcome: {
        screen: Welcome, 
        navigationOptions: {
            header: null,
        },
    },
    Browse: {
        screen: Browse, 
        navigationOptions: {
            header: null,
        },
    },
    Compte: {
        screen: Compte, 
        navigationOptions: {
            header: null,
        },
    },
    ErrorScreen: {
        screen: ErrorScreen, 
        navigationOptions: {
            header: null,
        },
    }
})

export default createAppContainer(AppStackNavigator);
