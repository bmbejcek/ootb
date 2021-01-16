import React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, Image } from "react-native";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Contacts from 'expo-contacts';
import { connect } from 'react-redux'
import {loadContacts, loadKeys, toggleScreen } from './../redux/actions';
import home from './../assets/home-min.png'
import * as SMS from 'expo-sms';

class Container extends React.Component {

async componentDidMount() {
  const { status } = await Contacts.requestPermissionsAsync();
  console.log(status)
  if (status === 'granted') {
    this.props.loadContactsInitialize();
    this.props.loadKeysInitialize();
  }
}

text = async() => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync(
      this.props.phone,
      ''
);
  } else {
    alert('Sorry. To use this app, you need to have SMS available')
}
}

handleOnClick = () => {
        this.props.toggleScreenClick(); // This prop acts as key to callback prop for mapDispatchToProps
    }

handleOnShuffle = () => {
        this.props.shuffle(); // This prop acts as key to callback prop for mapDispatchToProps
    }

render(){
  const { homeScreen, phone, storageKeys, contacts, error, toggleScreen, first, last } = this.props;

  if(homeScreen){
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop:50,
      }}>
        <TouchableOpacity onPress={this.handleOnClick}><Text style={{alignSelf: 'flex-end', right:30, fontFamily:'BebasNeue_400Regular', fontSize:20, color:`gray`}}>-->Settings</Text></TouchableOpacity>
        <View style={{width: `100%`, height: `60%`, float:`right`}}>
        <Image style={{height:`100%`, width:`100%`}} source={home} transition={false} />
        </View>
        <View style={{width: `100%`, height: `40%`}}>
        <View style ={{left: 30}}>
        <Text style = {{fontSize: 50, paddingTop:30, fontFamily:'BebasNeue_400Regular'}}>{first}</Text>
        <Text style ={{fontSize: 50, paddingTop:10, fontFamily:'BebasNeue_400Regular'}}>{last}</Text>
        <View style = {{display:`contents`, flexDirection:`row`, paddingTop:30}}>
        <TouchableOpacity onPress={this.text}><Text style = {{fontFamily:'BebasNeue_400Regular', fontSize:30, textDecorationLine:`underline`}}>TEXT</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.text}><Text style = {{fontFamily:'BebasNeue_400Regular', fontSize:30, textDecorationLine:`underline`, marginLeft:20}}>SHUFFLE</Text></TouchableOpacity>
        </View>
        </View>
        </View>
      </View>
    )
  }
  else {
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop:50,
      }}>
        <TouchableOpacity onPress={this.handleOnClick}><Text style={{alignSelf: 'flex-end', right:30, fontFamily:'BebasNeue_400Regular', fontSize:20, color:`gray`}}>{'<--Home'}</Text></TouchableOpacity>
        <View style={{width: 50, height: `70%`, backgroundColor: 'steelblue', float:`right`}} />
        <View style={{width: 50, height: `30%`, backgroundColor: 'skyblue'}} />
      </View>
    )
  }

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
        first: state.reducers.first,
        last: state.reducers.last,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      toggleScreenClick: () => { // handles onTodoClick prop's call here
        dispatch(toggleScreen())
      },
      loadContactsInitialize: () => {
        dispatch(loadContacts())
      },
      loadKeysInitialize: () => {
        dispatch(loadKeys())
      },
      shuffle: () => { // handles onTodoClick prop's call here
        dispatch(shuffle())
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
// export default connect(mapStateToProps)(Container);
