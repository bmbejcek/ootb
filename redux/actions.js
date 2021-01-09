import {  LOAD_DATA_BEGIN,
          LOAD_DATA_SUCCESS,
          LOAD_DATA_ERROR,
          LOAD_KEYS_BEGIN,
          LOAD_KEYS_SUCCESS,
          LOAD_KEYS_ERROR
        } from './types.js';
import { AsyncStorage} from "react-native";
import * as Contacts from 'expo-contacts';

export function loadData() {
  return dispatch => {
    console.log('load_data_started')
    dispatch(loadDataBegin());
    return Contacts.getContactsAsync({
      fields: [Contacts.Fields.ID, Contacts.Fields.FirstName, Contacts.Fields.LastName,Contacts.Fields.PhoneNumbers],
      pageSize: 0,
      pageOffset: 0,
      sort: Contacts.SortTypes.LastName
    }).then(r => {
      let cleaned_contacts = []
      for(let i = 0; i < r.data.length; i++){
        try{
          if(r.data[i].phoneNumbers.length>0){
            cleaned_contacts.push(r.data[i])
          }
        }
        catch{
        }
    }
    dispatch(loadDataSuccess(cleaned_contacts));
  }).catch(error =>
        dispatch(loadDataError(error))
      );
}}

export function loadKeys() {
  return dispatch => {
    dispatch(loadKeysBegin());
    return AsyncStorage.getAllKeys().then((r)=> loadKeysSuccess(JSON.stringify(r))).catch(error =>
        dispatch(loadKeysError(error))
      );
}}

export const loadDataBegin = () => ({
  type: LOAD_DATA_BEGIN
});

export const loadDataSuccess = contacts =>({
    type: LOAD_DATA_SUCCESS,
    payload: {
      contacts
    }
})

export const loadDataError = error => ({
  type: LOAD_DATA_ERROR,
  payload: { error }
});

export const loadKeysBegin = () => ({
  type: LOAD_KEYS_BEGIN
});

export const loadKeysSuccess = keys =>({
    type: LOAD_KEYS_SUCCESS,
    payload: {
      keys
    }
})

export const loadKeysError = error => ({
  type: LOAD_KEYS_ERROR,
  payload: { error }
});

// export function toggleScreen() {
//   return {
//     type: TOGGLE_SCREEN
//   };
// }
//
// export const toggleContact = id => ({
//     type: TOGGLE_CONTACT,
//     payload: {
//     id
//   }
// })
//
// export const shuffle = id => ({
//     type: SHUFFLE,
//     payload: {
//     id
//   }
// })
