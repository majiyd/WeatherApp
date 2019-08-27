import React, { Component } from "react";
import axios from 'axios'
import {
  Platform,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from "react-native";

import SearchInput from "./components/SearchInput";

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: "",
      loading: false,
      errors: null,
      temperature: 0,
      weather: '',
      weather_abbr: ''
    }
  }
  componentDidMount = () => {
    this.updateLocation('San Francisco')
    this.setState({weather: "clear"})
  }
  updateLocation = city => {
    if (!city) return;

    this.setState({loading: true})
    axios.get(`https://www.metaweather.com/api/location/search/?query=${city}`)
      .then(response => {
        console.log(response.data[0].woeid)
        const locationID = response.data[0].woeid
        axios.get(`https://www.metaweather.com/api/location/${locationID}/`)
        .then(response => {
          const { the_temp, weather_state_abbr, weather_state_name} = response.data.consolidated_weather[0]
          this.setState({
            loading: false,
            errors: null,
            location: city,
            temperature: the_temp,
            weather: weather_state_name,
            weather_abbr: weather_state_abbr
          })
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          errors: error
        })
      })
  }
  render() {
    const {location, temperature, weather} = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground 
          source={require("./assets/clear.jpg") }
          style={styles.backgroundImageStyle}
        >
          <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
          <Text style={[styles.textStyle, styles.smallText]}>{weather}</Text>
          <Text style={[styles.textStyle, styles.largeText, styles.redText]}>
            {temperature}
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
