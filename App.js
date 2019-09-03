import React, { Component } from "react";
import axios from 'axios'
import * as Permissions from 'expo-permissions'
import {
  Platform,
  StyleSheet,
  Text,
  View,
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
  /**
   * @type async function
   * @desc This function asynchronously gets your location using navigator.geolocator. It is uses the longitude and latitude to fecth the weather from metaweather api but falls back to default location lagos if any error occurs
   */
  async getLocationAsync(){
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      navigator.geolocation.getCurrentPosition(
        position => {
          JSON.stringify(position)

          this.setState({loading: true})
          axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`)
          .then(response => {
            const city = response.data[0].title
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
        },
        error => {         
          this.updateLocation('Lagos')
          return
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
      return 
    } else {
      this.updateLocation('Lagos')
      return 
    }
  }
  componentDidMount = () => {
    this.getLocationAsync()
    this.setState({
      weather: "clear",
      loading: true,
    })
  }

  getBackgroundImage = (weather=this.state.weather_abbr) => {
    switch (weather) {
      case 'c':
        return require('./assets/clear.jpg')
      case 'lc':
        return require('./assets/light-cloud.jpg')
      case 'hc':
        return require('./assets/cloudy.png')
      case 's':
        return require('./assets/showers.png')
      case 'lr':
        return require('./assets/light-rain.png')
      case 'hr':
        return require('./assets/heavy-rain.jpg')
      case 't':
        return require('./assets/thunderstorm.png')
      case 'h':
        return require('./assets/hail.png')
      case 'sl':
        return require('./assets/slate.png')
      case 'sn':
        return require('./assets/snow.png')
      default:
        return require('./assets/clear.jpg')
    }
  }
  updateLocation = city => {
    if (!city) return;

    this.setState({loading: true})
    axios.get(`https://www.metaweather.com/api/location/search/?query=${city}`)
      .then(response => {
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
    const {location, temperature, weather, loading, errors} = this.state
    const image = this.getBackgroundImage()
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content"/>
        <ImageBackground 
          source={image }
          style={styles.backgroundImageStyle}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="#222823" size="large"/>

            {!loading && (
              <View style={{flex: 1, justifyContent: "center",  width: "100%", alignItems: "center"}}>
                {errors && (
                  <Text style={[styles.textStyle, styles.smallText]}>Couldn't not load weather, please try again</Text>
                )}

                {!errors && (
                  <View >
                    <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
                    <Text style={[styles.textStyle, styles.smallText]}>{weather}</Text>
                    <Text style={[styles.textStyle, styles.largeText, styles.redText]}>
                      {Math.round(temperature)}°
                    </Text>
                  </View>
                )}
                <SearchInput 
                  placeholder={"Type any city"}
                  onSubmit={this.updateLocation}
                />
              </View>
            )}
          </View>
          

          
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
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    alignItems: "center",
  }
  
});
