import {  LOAD_CONTACTS_SUCCESS,
          LOAD_CONTACTS_ERROR,
          LOAD_KEYS_SUCCESS,
          LOAD_KEYS_ERROR,
          TOGGLE_SCREEN} from './../actions.js';

const initialState = {
  contact_access: null,
  contacts: [],
  first: "XXXXXXXXXX",
  last: "XXXXXXXXXX",
  phone:"XXXXXXXXXX",
  homeScreen: true,
  storageKeys: [],
  lastPicked: null,
  error: null,
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
    default:
      return state;
  }
}
