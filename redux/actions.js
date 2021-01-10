import { AsyncStorage} from "react-native";
import * as Contacts from 'expo-contacts';

export const TOGGLE_SCREEN = 'TOGGLE_SCREEN';
export const TOGGLE_CONTACT = 'TOGGLE_CONTACT';
export const SHUFFLE = 'SHUFFLE';

export const LOAD_CONTACTS_SUCCESS = 'LOAD_CONTACTS_SUCCESS'
export const LOAD_CONTACTS_ERROR = 'LOAD_CONTACTS_ERROR'

export const LOAD_KEYS_SUCCESS = 'LOAD_KEYS_SUCCESS'
export const LOAD_KEYS_ERROR = 'LOAD_KEYS_ERROR'

export function loadContacts() {
  return dispatch => {
    return Contacts.getContactsAsync({
      fields: [Contacts.Fields.ID, Contacts.Fields.FirstName, Contacts.Fields.LastName,Contacts.Fields.PhoneNumbers],
      pageSize: 0,
      pageOffset: 0,
      sort: Contacts.SortTypes.LastName
    }).then(r => {
      AsyncStorage.setItem('hi',"well aren't ya a smart cookie for checkin this.")
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
    return dispatch(loadContactsSuccess(cleaned_contacts));
  }).catch(error =>
        dispatch(loadContactsError(error))
      );
}
}

export function loadKeys() {
  return dispatch => {
    return AsyncStorage.getAllKeys().then((r)=>
    dispatch(loadKeysSuccess(r.slice()))
  ).catch(error =>
        dispatch(loadKeysError(error))
      );
}}

export const loadContactsSuccess = contacts =>({
    type: LOAD_CONTACTS_SUCCESS,
    payload: contacts.slice()
})

export const loadContactsError = error => ({
  type: LOAD_CONTACTS_ERROR,
  payload: error
});

export const loadKeysSuccess = keys =>({
    type: LOAD_KEYS_SUCCESS,
    payload: keys
})

export const loadKeysError = error => ({
  type: LOAD_KEYS_ERROR,
  payload: error
});

export function toggleScreen() {
  return {
    type: TOGGLE_SCREEN
  };
}

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
