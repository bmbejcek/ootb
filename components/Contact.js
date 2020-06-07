import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View, Image, AsyncStorage } from "react-native";

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
    style={[contactStyles.name, this.state.enabled ? { color: 'white' } : { color: 'gray' }]}
    >{this.props.firstName} {this.props.lastName} {this.state.enabled ? '✓': null }</Text>

    )

}
  }

  const contactStyles = StyleSheet.create({
    name: {
      fontFamily: `Roboto`,
      fontSize:17,
      paddingBottom:10,
      overflow:'hidden'
    }
  });
