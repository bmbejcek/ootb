import {  LOAD_DATA_BEGIN,
          LOAD_DATA_SUCCESS,
          LOAD_DATA_ERROR,
          LOAD_KEYS_BEGIN,
          LOAD_KEYS_SUCCESS,
          LOAD_KEYS_ERROR,
          TOGGLE_SCREEN,
          TOGGLE_CONTACT,
          SHUFFLE} from './../actions.js';

const initialState = {
  finished_load_sequence: false,
  contact_access: null,
  smsAvailable: null,
  width: null,
  height: null,
  contacts: [],
  enabledContacts: [],
  disabledContacts: [],
  first: "XXXXXXXXXX",
  last: "XXXXXXXXXX",
  phone:"XXXXXXXXXX",
  homeScreen: true,
  storageKeys: null,
  lastPicked: null,
}

function toggle(state){
  return {
    ...state,
    homeScreen: !state.homeScreen
  };
}

export default function reducer(state=initialState, action){
  switch (action.type){
    case LOAD_DATA_BEGIN:
      return state;
    case LOAD_DATA_SUCCESS:
      return {
      ...state,
      contacts: action.payload.contacts};
    case LOAD_DATA_ERROR:
      alert(action.payload.error);
      return state;
    case LOAD_KEYS_BEGIN:
      return state;
    case LOAD_KEYS_SUCCESS:
      let disabled_contacts = []
      for(let i = 0; i < state.contacts; i++){
        if (action.payload.keys.includes(state.contacts[i].id)){
          disabled_contacts.push(state.contacts[i])
        }
      }
      console.log(state)
      console.log(disabled_contacts)
      return {
        ...state,
        storageKeys: action.payload.keys,
        enabledContacts: _.difference(disabled_contacts, state.contacts),
        disabledContacts: disabled_contacts
      }
    default:
      return state;
  }
}
