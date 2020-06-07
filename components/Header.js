import React, { useState } from "react";
import { Dimensions,StyleSheet, Text, TouchableHighlight, View, Image } from "react-native";
import * as Contacts from 'expo-contacts';

export default class Header extends React.Component {
  handleClick = (name) => {
      this.props.changeScreen(name);
  }


  render(){
    return(
      <View style={[styles.tabHolder]}>
      <TouchableHighlight
      disabled={this.props.homeScreenActive}
      style={[styles.settingsButton, this.props.homeScreenActive ? { backgroundColor: 'white' } : { backgroundColor: '#3959D2' }]}
      onPress={this.handleClick.bind(this,'home')}>
        <Text
        style={[styles.settingsText, this.props.homeScreenActive ? { color: '#3959D2' } : { color: 'white' }]}
        >Home</Text>
      </TouchableHighlight>
      <TouchableHighlight
      disabled={!this.props.homeScreenActive}
      style={[styles.settingsButton, this.props.homeScreenActive ? { backgroundColor: '#3959D2' } : { backgroundColor: 'white' }]}
      onPress={this.handleClick.bind(this,'settings')}>
        <Text
        style={[styles.settingsText, this.props.homeScreenActive ? { color: 'white' } : { color: '#3959D2' }]}
        >Settings</Text>
      </TouchableHighlight>
      </View>
    )
  }
  }

  const styles = StyleSheet.create({
    settingsButton: {
      alignItems: "center",
      padding: 10,
      borderColor: 'white',
      borderWidth: 3,
      width:90,
      height:45,
    },
    settingsText: {
      fontFamily: "Roboto",
      color: "white",
      fontSize: 13
    },
    tabHolder: {
      flex:1,
      flexDirection:'row',
      top:Math.round(Dimensions.get('window').width)/8,
    },
});
