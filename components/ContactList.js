import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View, Image } from "react-native";
import * as Contacts from 'expo-contacts';
import Contact from './Contact.js'

export default class App extends React.Component {

render(){
  return(this.props.contacts.map(d =>
    <Contact storageKeys={this.props.storageKeys} key = {d.id} firstName={d.firstName} lastName={d.lastName} id= {d.id}/>
  ))
}
  }
