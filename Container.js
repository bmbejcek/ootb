import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image, ScrollView, AsyncStorage, Animated } from "react-native";
import * as Font from 'expo-font';
import * as Contacts from 'expo-contacts';
import ContactList from './components/ContactList.js'
import Header from './components/Header.js'
import Background from './components/Background.js'
import Splash from './components/Splash.js'
import { LinearGradient } from 'expo-linear-gradient'
import SlotMachine from './components/Slot.js'
import * as SMS from 'expo-sms';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import { Provider, connect } from 'react-redux'
import {loadData, loadKeys} from './redux/actions';

class Container extends React.Component {

async componentDidMount() {
  const { status } = await Contacts.requestPermissionsAsync();
  console.log(status)
  if (status === 'granted') {
    this.props.dispatch(loadData());
  }
}

render(){
  const { loaded, phone } = this.props;
  return (
    <View style={{padding:100}}>
      <Text>Contacts Module Example</Text>
      <Text>{phone}</Text>
    </View>
  );
}
}

const mapStateToProps = state => {
  console.log(state.reducers.phone)
    return {
        loaded: state.reducers.loaded,
        disabled_contacts: state.reducers.disabledContacts,
        phone: state.reducers.phone,
    }
}

export default connect(mapStateToProps)(Container);
