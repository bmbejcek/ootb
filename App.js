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
import store from './redux/store'
import { Provider } from 'react-redux'
import {loadData} from './redux/actions';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        loadData();
      }
    })();
  }, []);

  return (
    <View>
      <Text>Contacts Module Example</Text>
    </View>
  );
}
