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

class Welcome extends Component {
  static navigationOptions = {
    header: null
  };

  scrollX = new Animated.Value(0);

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        style={styles.mt_20}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Block center style={{ justifyContent:'center'}}>
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 3.5, overflow: "visible" }}
          />
          <Text center style={{ flex: 1, width: width/1.2, overflow: "visible", textAlign: 'center'  }}>
            {item.msg}
          </Text>
          </Block>
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }
        ], {useNativeDriver: false})}
      />
    );
  }

  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.2, 1, 0.2],
            extrapolate: "clamp"
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color= {theme.colors.primary}
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h2 center bold>
            DATA FOR CHILDREN
          </Text>
          <Text center h4 gray style={{ margin: theme.sizes.padding }}>
          Accès aux données statistiques sur La situation des enfants et des femmes en RDC pour les professionnels, étudiants, chercheurs et publics en général
          </Text>
        </Block>
        <Block center middle style={ styles.mt_5} >
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient 
           onPress={() => navigation.navigate("Browse") }>
            <Text center semibold white>
              Lancez-vous
            </Text>
          </Button>
          
          <Button
           onPress={() => navigation.navigate("Compte") }>
            <Text center caption gray>
              Creer un compte
            </Text>
          </Button>

          <Text caption gray center>
            © Data for children All rights Reserved
          </Text>
          <Text caption gray2 center>
            Powered by Unicef et Pnud
          </Text>
        </Block>
      </Block>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/undraw_4.png"),
      msg: "Rendre les données relatives à la situation des enfants et des femmes plus accessibles aux utilisateurs." },
    { id: 2, source: require("../assets/undraw_1.png"), 
      msg: "Générer des éléments d'analyse personnalisés tels que des graphiques, des diagrammes, des tableaux et des cartes." },
    { id: 3, source: require("../assets/undraw_2.png"), 
      msg: "Assurer l'archivage permanent de tous les documents." }]
};

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 2.5
  },
  mt_5: {
    marginTop: 10
  },
  mt_20: {
    marginTop: 20
  },
  m_20: {
    margin: 20
  }
});

export default Welcome;
