import {LOAD_DATA, TOGGLE_SCREEN, TOGGLE_CONTACT, SHUFFLE} from './../types.js';

const initialState = {
  loaded: false,
  enabledContacts: [],
  disabledContacts: [],
  first: "XXXXXXXXXX",
  last: "XXXXXXXXXX",
  phone:"",
  homeScreen: true,
  contactsLoaded: false,
  storageKeys: null,
  lastPicked: null,
  count:0,
  height:null,
  width:null
}

function toggle(state){
  return {
    ...state,
    homeScreen: !state.homeScreen
  };
}

function reducer(state=initialState, action){
  switch (action.type){
    case LOAD_DATA:
      return state;
    case TOGGLE_SCREEN:
      return toggle(state);
    case TOGGLE_CONTACT:
      return state;
    case SHUFFLE:
      return state;
    default:
      return state;
  }
}

export default reducer;
