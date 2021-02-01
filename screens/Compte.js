import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, ActivityIndicator, View, Dimensions, StatusBar } from 'react-native';
import Constants from 'expo-constants';


const { width, height } = Dimensions.get("window");

function MyStatusBar({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class Compte extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    //Settin up an interval for the counter
    this.t = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  componentDidMount() {
    //Here is the Trick
    const { navigation } = this.props;

    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
    });
  }

  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
    clearTimeout(this.t);
  }


  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#00B0FF"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  render() {
    return (
      <View style={{flex:1}}>
        <MyStatusBar backgroundColor="#00B0FF" barStyle='light-content' />
        <WebView
          style={styles.WebViewStyle}
          //Loading URL
          source={{ uri: 'www.data4children.uzishapos.com/app/?register=true' }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          renderLoading={this.ActivityIndicatorLoadingView}
          //Want to show the view or not
          startInLoadingState={true}
        
          onError={()=> this.props.navigation.navigate("ErrorScreen")}
        />
      </View>
    );
  }
  }
  const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  ActivityIndicatorStyle: {
    width: width,
    height: height+50,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20   
  },
});