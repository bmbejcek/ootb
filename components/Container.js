import React from "react";
import { Animated, Text, View, TouchableHighlight, TouchableOpacity, Image, ScrollView, Alert, AsyncStorage } from "react-native";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Contacts from 'expo-contacts';
import { connect } from 'react-redux'
import {loadContacts, loadKeys, toggleScreen, shuffle, remove } from './../redux/actions';
import home from './../assets/home-min.png'
import * as SMS from 'expo-sms';
import TypeWriter from 'react-native-typewriter'
import ContactList from './ContactList.js'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Linking from 'expo-linking';
import Onboarding from './../components/Onboarding.js'


class Container extends React.Component {

state = {
    marginValue: new Animated.Value(0)
  };


fadeIn = new Animated.Value(0);

async componentDidMount() {
  Animated.timing(this.fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      delay:2000
    }).start();
  const { status } = await Contacts.requestPermissionsAsync();

  if (status === 'granted') {
    this.props.loadContactsInitialize();
    this.props.loadKeysInitialize();
  }
}

_start = () => {
  this.props.shuffle()
  Animated.timing(this.state.marginValue, {
    toValue: this.props.marginLeft,
    duration: 1000,
    useNativeDriver: false
  }).start();
};


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

remove = async() => {
AsyncStorage.setItem(this.props.id, 'disabled');
this.props.remove(this.props.id);
this.props.shuffle()
}

removeClicked = async() => {
  Alert.alert(
      'Good riddance',
      "You are removing this contact from future shuffles. No worries, you can always include them again by going under settings.",
      [
        {text: 'Okay', onPress: () => this.remove()},
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
}



call = () => {
  const url = 'tel:'+this.props.phone

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url)
          .catch(() => null);
      }
    });
}

handleOnClick = () => {
        this.props.loadKeysInitialize();
        this.props.toggleScreenClick(); // This prop acts as key to callback prop for mapDispatchToProps
    }

render(){
  const { homeScreen, phone, storageKeys, contacts, error, toggleScreen, name, marginLeft, onboarded } = this.props;
  const fontSizeName = name.length > 15 ? RFPercentage(6.5)- (Math.min(name.length,30) * (RFPercentage(0.1))*(75/100)) : RFPercentage(6.5);
  if(onboarded==null){
    return(
      <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
      <Animated.Text style={{ opacity: this.fadeIn, textAlign:`center`, padding:30, fontFamily:'BebasNeue_400Regular', fontSize:RFPercentage(4) }}>
        Allow Out of the Blue to access your contacts in your phone settings and restart this app. Not to worry, no tracking analytics are used and no one will be able to see your contacts except for you.
      </Animated.Text>

</View>)
  }
  else if(onboarded==true){
      if(homeScreen){
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop:`10%`
      }}>
        <TouchableOpacity onPress={this.handleOnClick}><Text style={{alignSelf: 'flex-end', right:30, fontFamily:'BebasNeue_400Regular', fontSize:RFPercentage(2.5), color:`gray`}}> > Settings</Text></TouchableOpacity>
        <View style={{width: `100%`, height: `40%`, float:`right`}}>
        <Animated.View style ={{marginLeft:this.state.marginValue}}><Image style={{height:`100%`, width:`100%`, overflow:`visible`}} source={home} /></Animated.View>
        </View>
        <View style={{width: `100%`, minHeight: `40%`}}>
        <View style ={{left: 30, marginTop:20, flex:1}}>
        <TouchableOpacity disabled = {!this.props.enabled} onPress={this.removeClicked}><Text style = {[{paddingTop:30,fontFamily:'BebasNeue_400Regular', fontSize:RFPercentage(2.25), textDecorationLine:`underline`}, this.props.enabled? {color:'black'} : {color:'lightgray'}]}>[REMOVE FROM FUTURE SHUFFLES]</Text></TouchableOpacity>
        <View style={{justifyContent: 'center', minHeight: 100}}><TypeWriter numberOfLines={1} style = {{justifyContent:`center`,width:`100%`,color:`gray`,fontSize:fontSizeName, paddingTop:30, fontFamily:'BebasNeue_400Regular'}} typing={1}><Text numberOfLines={1}>{name}</Text></TypeWriter></View>
        <TypeWriter style = {{width:`300%`, color:`gray`,minHeight: 100,fontSize:Math.min(RFPercentage(4), fontSizeName), fontFamily:'BebasNeue_400Regular'}} typing={1}>{phone}</TypeWriter>
        <View style = {{display:`flex`, flexDirection:`row`}}>
        <TouchableOpacity disabled = {!this.props.enabled} onPress={this.text}><Text style = {[{fontFamily:'BebasNeue_400Regular', fontSize:RFPercentage(3.5), textDecorationLine:`underline`}, this.props.enabled? {color:'black'} : {color:'lightgray'}]}>TEXT THEM</Text></TouchableOpacity>
        <TouchableOpacity disabled = {!this.props.enabled} onPress={this.call}><Text style = {[{fontFamily:'BebasNeue_400Regular', marginLeft:20, fontSize:RFPercentage(3.5), textDecorationLine:`underline`}, this.props.enabled? {color:'black'} : {color:'lightgray'}]}>CALL THEM</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this._start()}><Text style = {{fontFamily:'BebasNeue_400Regular', fontSize:RFPercentage(3.5), textDecorationLine:`underline`, marginLeft:20, color:`blue`}}>SHUFFLE</Text></TouchableOpacity>
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
        paddingTop:`10%`,
      }}>
        <TouchableOpacity onPress={this.handleOnClick}><Text style={{alignSelf: 'flex-end', right:30, fontFamily:'BebasNeue_400Regular', fontSize:RFPercentage(2.5), color:`gray`}}>{'< Home'}</Text></TouchableOpacity>
        <View style={{width: `100%`, height: `20%`,float:`right`,overflow:`visible`}}>
        <Image style={{height:`100%`, width:`120%`, marginLeft:-50, overflow:`visible`, resizeMode: 'contain'}} source={home} />
        </View>
        <View style={{marginTop:20, paddingLeft:30, paddingRight:30, width: `100%`, height: `65%`}}>
        <Text style ={{paddingBottom:10, fontFamily:'BebasNeue_400Regular', fontSize:RFPercentage(3)}}>Select your contacts to include</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        <ContactList storageKeys={this.props.storageKeys} contacts={this.props.contacts} />
        </ScrollView>
        </View>
      </View>
    )
  }
  }
  else{
    return(<Onboarding/>)
    
  }
}
}

const mapStateToProps = state => {
    return {
        loaded: state.reducers.loaded,
        contacts: state.reducers.contacts,
        phone: state.reducers.phone,
        error: state.reducers.error,
        homeScreen: state.reducers.homeScreen,
        storageKeys: state.reducers.storageKeys,
        name: state.reducers.name,
        marginLeft: state.reducers.marginLeft,
        enabled: state.reducers.enabled,
        onboarded: state.reducers.onboarded,
        id: state.reducers.id
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
      remove: (id) => { // handles onTodoClick prop's call here
        dispatch(remove(id))
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
