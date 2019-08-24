import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  KeyboardAvoidingView
} from "react-native";

import SearchInput from "./components/SearchInput";

export default class App extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={[styles.textStyle, styles.largeText]}>San Francisco</Text>
        <Text style={[styles.textStyle, styles.smallText]}>Light Showers</Text>
        <Text style={[styles.textStyle, styles.largeText, styles.redText]}>
          25°
        </Text>

        <SearchInput placeholder={"Type any city"}/>
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
  }
  
});
