import React, { Component } from 'react';
import { StyleSheet, TextInput, View  } from 'react-native';

class SearchInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }
  handleChangeText = newLocation => {
    this.setState({text: newLocation})
  }
  handleSubmitEditing = () => {
    this.props.onSubmit(this.state.text)
    this.setState({text: ""})
    
  }
  render() { 
    return ( 
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={this.props.placeholder}
          value={this.state.text}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
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