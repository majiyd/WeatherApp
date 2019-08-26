import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";

import SearchInput from "./components/SearchInput";

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: "San Francisco"
    }
  }
  updateLocation = city => {
    console.log(city);
    this.setState({location: city})
  }
  render() {
    const {location} = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground 
          source={require("./assets/bg.jpg") }
          style={styles.backgroundImageStyle}
        >
          <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
          <Text style={[styles.textStyle, styles.smallText]}>Light Showers</Text>
          <Text style={[styles.textStyle, styles.largeText, styles.redText]}>
            25°
          </Text>

          <SearchInput 
            placeholder={"Type any city"}
            onSubmit={this.updateLocation}
          />
        </ImageBackground>
        
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textStyle: {
    textAlign: "center",
    margin: 2,
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNext-Regular"
      },
      android: {
        fontFamily: "Roboto"
      }
    })
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  redText: {
    color: "red"
  },
  backgroundImageStyle: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: '#ccc',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  }
  
});
