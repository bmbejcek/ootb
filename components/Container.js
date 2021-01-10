import React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity } from "react-native";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Contacts from 'expo-contacts';
import { connect } from 'react-redux'
import {loadContacts, loadKeys, toggleScreen } from './../redux/actions';

class Container extends React.Component {

async componentDidMount() {
  const { status } = await Contacts.requestPermissionsAsync();
  console.log(status)
  if (status === 'granted') {
    this.props.dispatch(loadContacts());
    this.props.dispatch(loadKeys());
  }
}

render(){
  const { homeScreen, phone, storageKeys, contacts, error, toggleScreen } = this.props;
  if(homeScreen){
    return(
      <View style ={{padding:100}}>
      <Text> HOME </Text>
      <TouchableOpacity onPress={toggleScreen}><Text>Toggle</Text></TouchableOpacity>
      <Text> {homeScreen}</Text>
      </View>
    )
  }
  else {
    return(
      <View/>
    )
  }
  return (
    <View style={{padding:100}}>
      <Text>Contacts Module Example</Text>
      <Text>{contacts.length}</Text>
      <Text>{storageKeys.length}</Text>
      <Text>4</Text>
    </View>
  );
}
}

const mapStateToProps = state => {
  console.log(state.reducers.homeScreen)
    return {
        loaded: state.reducers.loaded,
        contacts: state.reducers.contacts,
        phone: state.reducers.phone,
        error: state.reducers.error,
        homeScreen: state.reducers.homeScreen,
        storageKeys: state.reducers.storageKeys,
    }
}

function mapDispatchToProps(dispatch) {
	return {
		toggleScreen: bindActionCreators(toggleScreen, dispatch),
	};
}

export default connect(mapStateToProps)(Container);
