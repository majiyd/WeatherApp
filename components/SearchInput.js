import React, { Component } from 'react';
import { StyleSheet, TextInput, View  } from 'react-native';

class SearchInput extends Component {
  
  render() { 
    return ( 
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={this.props.placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#666",
    width: "90%"
  },
  textInput: {
    flex: 1,
    color: "white",
  }
})
export default SearchInput;