import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View, Image, AsyncStorage } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class App extends React.Component {
  state = {
    id: this.props.id,
    enabled: true,
  }

  async toggle(id) {
    const enabled= !this.state.enabled
    this.setState({
      enabled: enabled
    })
    if(!enabled){
      AsyncStorage.setItem(id, 'disabled');
    }
    else{
      AsyncStorage.removeItem(id);
    }
  }
  componentDidMount(storageKeys){
    if(this.props.storageKeys!=null){
      if(this.props.storageKeys.indexOf(this.props.id)>-1){
        this.setState({enabled:false})
      }
    }

  }

render(){
    return(
    <Text onPress={this.toggle.bind(this, this.props.id)} key= {this.props.id}
    style={[contactStyles.name, this.state.enabled ? { color: 'blue' } : { color: 'gray' }]}
    >{this.props.firstName} {this.props.lastName} {this.state.enabled ? '✓': null }</Text>

    )

}
  }

  const contactStyles = StyleSheet.create({
    name: {
      fontFamily: `BebasNeue_400Regular`,
      fontSize:RFPercentage(3),
      paddingBottom:10,
      width:`300%`
    }
  });
