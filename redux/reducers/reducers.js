import {  LOAD_CONTACTS_SUCCESS,
          LOAD_CONTACTS_ERROR,
          LOAD_KEYS_SUCCESS,
          LOAD_KEYS_ERROR,
          TOGGLE_SCREEN,
          SHUFFLE} from './../actions.js';

import _ from 'lodash'

const initialState = {
  contact_access: null,
  contacts: [],
  name: "XXXXXX XXXXXXX",
  phone:"XXXXXXXXXX",
  homeScreen: true,
  storageKeys: [],
  lastPicked: null,
  error: null,
  marginLeft:300,
  enabled: false
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
      return {
        ...state,
        storageKeys: action.payload.slice(),
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
    case SHUFFLE:
      let filtered = _.reject(state.contacts, v => _.includes(state.storageKeys, v.id));
      let c = filtered[Math.floor(Math.random() * filtered.length)]
      let ml = 0
      if (state.marginLeft == 300) {
        ml = 150
      }
      else if (state.marginLeft == 150) {
        ml = -200
      }
      else if (state.marginLeft == -200) {
        ml = -350
      }
      else if (state.marginLeft == -350) {
        ml = 0
      }
      else{
        ml = 300
      }
      return {
        ...state,
        name: c.name,
        phone: c.phoneNumbers[0].number,
        marginLeft: ml,
        enabled: true
      }
    default:
      return state;
  }
}
