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

  state = {
    showTerms: false
  };

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Les conditions d'utilisations
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              1. Your use of the Service is at your sole risk. The service is
              provided on an "as is" and "as available" basis.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              2. Support for Expo services is only available in English, via
              e-mail.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              3. You understand that Expo uses third-party vendors and hosting
              partners to provide the necessary hardware, software, networking,
              storage, and related technology required to run the Service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              4. You must not modify, adapt or hack the Service or modify
              another website so as to falsely imply that it is associated with
              the Service, Expo, or any other Expo service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              5. You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              6. You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access
              to the Service without the express written permission by Expo.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              7. We may, but have no obligation to, remove Content and Accounts
              containing Content that we determine in our sole discretion are
              unlawful, offensive, threatening, libelous, defamatory,
              pornographic, obscene or otherwise objectionable or violates any
              party's intellectual property or these Terms of Service.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              8. Verbal, physical, written or other abuse (including threats of
              abuse or retribution) of any Expo customer, employee, member, or
              officer will result in immediate account termination.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              9. You understand that the technical processing and transmission
              of the Service, including your Content, may be transferred
              unencrypted and involve (a) transmissions over various networks;
              and (b) changes to conform and adapt to technical requirements of
              connecting networks or devices.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              10. You must not upload, post, host, or transmit unsolicited
              e-mail, SMSs, or "spam" messages.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              onPress={() => this.setState({ showTerms: false })}
            >
              <Text center white>
               Je comprends
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

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
    const { navigation, isInstalled } = this.props;
    if(!isInstalled) {
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h2 center bold>
            Data for Children
          </Text>
          <Text h4 style={{ marginTop: theme.sizes.padding / 2 }}>
            Rendre les données des enfants et des femmes plus accessibles.
          </Text>
        </Block>
        <Block center middle style={ styles.mt_5} >
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button 
           onPress={() => navigation.navigate("Browse") }>
            <Text center semibold white>
              Lancez-vous
            </Text>
          </Button>
          
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>
              Conditions d'utilisations
            </Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
    }
    else {
      return (
        <Block >
          <Block  middle style={ styles.m_20} >
            <Button gradient>
              <Text center semibold white>
              Retour
              </Text>
            </Button>
          </Block>
        </Block>
      );
    }
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/undraw_4.png"),
      msg: "Rendre les données relatives à la situation des enfants et des femmes plus accessibles aux utilisateurs." },
    { id: 2, source: require("../assets/undraw_1.png"), 
      msg: "Générer des éléments d'analyse personnalisés tels que des graphiques, des diagrammes, des tableaux et des cartes." },
    { id: 3, source: require("../assets/undraw_1.png"), 
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
