import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image, ScrollView, AsyncStorage, Animated } from "react-native";
import * as Font from 'expo-font';
import * as Contacts from 'expo-contacts';
import ContactList from './components/ContactList.js'
import Header from './components/Header.js'
import Background from './components/Background.js'
import Splash from './components/Splash.js'
import { LinearGradient } from 'expo-linear-gradient'
import SlotMachine from './components/Slot.js'
import * as SMS from 'expo-sms';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';


export default class App extends React.Component {

  state = {
    first:"XXXXXXXXXX",
    last: "XXXXXXXXXX",
    phone:"",
    data: null,
    fontLoaded: false,
    contactDisabled: true,
    homeScreen: true,
    contacts: [],
    contactsLoaded: false,
    storageKeys: null,
    Disabled:false,
    count:0,
    height:null,
    width:null

  }

  updateScreen = (childData) => {
      this.setState({homeScreen: childData})}

  handleCall = () => {
    const url = 'tel:'+this.state.phone

    Linking.canOpenURL(url)
    	.then((supported) => {
    		if (supported) {
    			return Linking.openURL(url)
    				.catch(() => null);
    		}
    	});
}
  async componentDidMount() {
    try {
  await SplashScreen.preventAutoHideAsync();
} catch (e) {
  console.warn(e);
}
this.prepareResources();
}
prepareResources = async () => {

      this.setState({width:Math.round(Dimensions.get('window').width), height:Math.round(Dimensions.get('window').height)})
      const status = await Contacts.requestPermissionsAsync();
      await Font.loadAsync({
          'Roboto': require('./assets/fonts/DroidSansMono.ttf'),
        });
        this.setState({ fontLoaded: true })
      await Contacts.getContactsAsync({
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
              console.log(r.data[i])
            }
          }
          catch{
          }
      }
      this.setState({contactsLoaded:true, contacts:cleaned_contacts})})
      AsyncStorage.setItem('hi',"well aren't ya a smart cookie for checkin this.")
      const a = await AsyncStorage.getAllKeys().then((r)=> this.setState({storageKeys:JSON.stringify(r)})).then(this.setState(async () => {await SplashScreen.hideAsync()}))
      }


    text = async() => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          this.state.phone,
          ''
);
      } else {
        alert('Sorry. To use this app, you need to have SMS available')
}
    }

    onShuffle = async() => {
    const eligible_contacts = []
    const ineligible = await AsyncStorage.getAllKeys()
    let last_picked = await AsyncStorage.getItem('last').catch()
    if(last_picked == null){
      last_picked = ""
    }
    for(let i = 0; i < this.state.contacts.length; i++){
      if(ineligible.indexOf(this.state.contacts[i].id)<0 & this.state.contacts[i].id!=last_picked){
        eligible_contacts.push(this.state.contacts[i])
      }
    }
    const num = Math.floor(Math.random() * eligible_contacts.length) + 1
    const picked = eligible_contacts[num]
    AsyncStorage.setItem('last',picked.id).catch()

    let number = picked.phoneNumbers[0].number
    let first = ""
    try{
      first = picked.firstName.toUpperCase()
    }
    catch {
    }
    let last = ""
    try{
    last = picked.lastName.toUpperCase()
    }
    catch{
    }

    while(first.length<this.state.first.length){
      first=first+' '
    }

    while(last.length<this.state.last.length){
      last=last+' '
    }

    if(first.length>10){
      first = first.substring(0,9)
      first = first.replace(/.$/,"…")
    }

    if(last.length>10){
      last = last.substring(0,9)
      last = last.replace(/.$/,"…")
    }

    this.setState({
      phone: number,
      first: first,
      last: last,
      contactDisabled:false
    })

  }

  changeScreen = (x) => {
    if(x=='home'){
      this.setState({
        homeScreen: true
      })
    }
    else if (x=='settings'){
      this.setState({
        homeScreen: false
      })
    }

  }
  render(){
    if(this.state.contactsLoaded & this.state.fontLoaded & this.state.storageKeys!=null){
      return (
        <View>
        <Background/>
        <View style={{flex:1, position:`absolute`, alignItems:`center`, justifyContent:`center`, flexDirection: 'column', height:`100%`, width:`100%`}}>
        <Image
        style={[this.state.homeScreen ? { zIndex: 9999, width:550, height:550, margin:10, padding:10 } : { display: 'none' }]}
        source={require('./assets/weird_pentagon.png')}
        />
        </View>

        <View style={{display:`flex`,position:`absolute`, flexDirection: 'row', height:`100%`, width:`100%`, alignItems:`center`, justifyContent:`center`}}>

          <View style={[styles.homeContainer, this.state.homeScreen ? { display: 'flex' } : { display: 'none' }]}>
            <Header homeScreenActive={this.state.homeScreen} changeScreen={this.changeScreen} />
            <View style={{flex:1, position:`absolute`,flexDirection: 'column', justifyContent:`center`, width:`100%`}}>
            <SlotMachine text={this.state.first}
                            width={30} height={50} duration={1000}
                            ref="slot" range="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.+-()[]/'… "
                            initialAnimation={false}/>
            <SlotMachine text={this.state.last}
                            width={30} height={50} duration={1000}
                            ref="slot" range="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.+-()[]/'… "
                            initialAnimation={false}/>
            <View style={styles.buttonHolder}>
            <View style={styles.contactButtonHolder}>
            <TouchableOpacity disabled = {this.state.contactDisabled} activeOpacity={0.8} style={[styles.contactButton,,{marginRight:10}, this.state.contactDisabled? {backgroundColor:'gray', borderColor:'gray'} : {backgroundColor:'white'}]} onPress={this.text}>
              <Text style={styles.contactText}>Text</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={[styles.contactButton,{marginLeft:10}, this.state.contactDisabled? {backgroundColor:'gray', borderColor:'gray'} : {backgroundColor:'white'}]} onPress={this.handleCall}>
              <Text style={styles.contactText}>Call</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.shuffleButton} onPress={this.onShuffle}>
              <Text style={styles.shuffleText}>Shuffle</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>

          <View style={[styles.homeContainer, !this.state.homeScreen ? {display: `flex`} : {display: `none`}]}>
          <Header homeScreenActive={this.state.homeScreen} changeScreen={this.changeScreen} />
          <View style={{height:`100%`, zIndex:-10}}>
          <Text style={styles.settingsInstructions}>Please select contacts to include:</Text>
          <View style={{height:`60%`}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <ContactList storageKeys={this.state.storageKeys} contacts={this.state.contacts}/>
          </ScrollView>
          </View>
          </View>

          </View>
          </View>
        </View>


      )
    }
    else{
      return(<Splash/>)
    }

  }

}

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: "center",
    paddingTop:50,
    width:"80%",
  },
  buttonHolder: {
    flex: 1,
    justifyContent: 'center',
    marginTop:30,
    width:'100%',
  },
  contactButtonHolder:{
    flex: 1,
    flexDirection:'row',
    height:55
  },
  contactButton: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    flex:1,
    height:55,
    borderColor: 'white',
    borderWidth: 3,
    zIndex:1000
  },
  shuffleButton: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#3959D2",
    borderColor: 'white',
    flex:1,
    borderWidth: 3,
    height:55,
    marginTop:20,
    width:"100%",
    zIndex:1000
  },
  shuffleText: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: 20
  },
  contactText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#3959D2",
  },
  settingsInstructions:{
    fontFamily: "Roboto",
    color: "white",
    fontSize:20,
    marginTop:150,
    marginBottom:30,
  },

});
