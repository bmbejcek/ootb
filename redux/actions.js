import {DATA_LOADED, TOGGLE_SCREEN, TOGGLE_CONTACT, SHUFFLE} from './types.js';
import { AsyncStorage} from "react-native";
import * as Contacts from 'expo-contacts';

export function loadData() {
  console.log('hi hi')
  return function(dispatch) {
    return Contacts.getContactsAsync({
      fields: [Contacts.Fields.ID, Contacts.Fields.FirstName, Contacts.Fields.LastName,Contacts.Fields.PhoneNumbers],
      pageSize: 0,
      pageOffset: 0,
      sort: Contacts.SortTypes.LastName
    }).then(r => {
      let cleaned_contacts = []
      //
      for(let i = 0; i < r.data.length; i++){
        try{
          if(r.data[i].phoneNumbers.length>0){
            cleaned_contacts.push(r.data[i])
            console.log(r.data[i])
          }
        }
        catch{
        }
    }}).catch(error => {
      throw(error);
    });
  };
}


export function dataLoaded(){
  return {
    type: DATA_LOADED
  };
}

export function toggleScreen() {
  return {
    type: TOGGLE_SCREEN
  };
}

export const toggleContact = id => ({
    type: TOGGLE_CONTACT,
    payload: {
    id
  }
})

export const shuffle = id => ({
    type: SHUFFLE,
    payload: {
    id
  }
})
