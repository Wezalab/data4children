import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

class ErrorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0};
    //Settin up an interval for the counter
    this.t = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }
 
  componentWillUnmount() {
    // Remove the event listener before removing the screen
    clearTimeout(this.t);
  }
  static navigationOptions = {
    header: null
  };

  
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block style={{ marginTop: theme.sizes.padding * 2}} center bottom flex={0.4}>
          <Text h1 center bold>
            
            <Text h1 tertiary>
              {""}
              OUPSSS!
            </Text>
          </Text>
          <Text center h3 gray style={{ margin: theme.sizes.padding, marginBottom:19 }}>
          On dirait que vous n'êtes pas connectés à Internet. 
          Veuillez vérifier votre connexion et réessayer.

          </Text>
        </Block>
        <Block center middle style={{ margin: 1 }}>
        <Image
            source={require("../assets/undraw_5.png")}
            resizeMode="stretch"
            style={{overflow: "hidden", width: width, height:width/1.5 }}
          />
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate("Welcome")}>
            <Text center semibold white>
            Réessayer
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

export default ErrorScreen;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});
