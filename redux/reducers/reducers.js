import {  LOAD_CONTACTS_SUCCESS,
          LOAD_CONTACTS_ERROR,
          LOAD_KEYS_SUCCESS,
          LOAD_KEYS_ERROR,
          TOGGLE_SCREEN,
          SHUFFLE,
          FINISH_ONBOARDING,
          REMOVE} from './../actions.js';

import { Alert } from "react-native";

import _ from 'lodash'

const initialState = {
  contact_access: null,
  contacts: [],
  id:null,
  name: "XXXXXX XXXXXXX",
  phone:"XXXXXXXXXX",
  homeScreen: true,
  storageKeys: [],
  lastPicked: null,
  error: null,
  marginLeft:-400,
  enabled: false,
  onboarded: null,
}

export default function reducer(state=initialState, action){
  switch (action.type) {
    case LOAD_CONTACTS_SUCCESS:
      return {
      ...state,
      contacts: action.payload.slice()};
    case LOAD_CONTACTS_ERROR:
      return {
        ...state,
        error: action.payload};
    case LOAD_KEYS_SUCCESS:
      var a = action.payload.includes('onboarding')
      return {
        ...state,
        storageKeys: action.payload.slice(),
        onboarded: a
      }
    case LOAD_KEYS_ERROR:
      return {
        ...state,
        error: action.payload};
    case TOGGLE_SCREEN:
      return {
        ...state,
        homeScreen: !state.homeScreen
      }
    case REMOVE:
      state.storageKeys.push(action.payload)
      return {
        ...state,
      }

    case SHUFFLE:
      try{
        let filtered = _.reject(state.contacts, v => _.includes(state.storageKeys, v.id));
      let c = filtered[Math.floor(Math.random() * filtered.length)]
      let ml = 0
      if (state.marginLeft == -150) {
        ml = -300
      }
      else if (state.marginLeft == -300) {
        ml = -450
      }
      else if (state.marginLeft == -450) {
        ml = -10
      }
      else if (state.marginLeft == -10) {
        ml = -190
      }
      else{
        ml = -150
      }
      return {
        ...state,
        name: c.name,
        phone: c.phoneNumbers[0].number,
        marginLeft: ml,
        enabled: true,
        id: c.id
      }
      }
      catch{
        Alert.alert('Whoopsies.','To use this app, you must have some contacts saved and enabled under settings.')
      }
      
    case FINISH_ONBOARDING:
      return{
        ...state,
        onboarded:true
      }
    default:
      return state;
  }
}
