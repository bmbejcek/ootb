import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image, ScrollView, AsyncStorage } from "react-native";
import * as Font from 'expo-font';
import * as Contacts from 'expo-contacts';
import ContactList from './components/ContactList.js'
import Header from './components/Header.js'
import Background from './components/Background.js'
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
        //
        for(let i = 0; i < r.data.length; i++){
          try{
            if(r.data[i].phoneNumbers.length>0){
              cleaned_contacts.push(r.data[i])
            }
          }
          catch{

          }
      }
      this.setState({contactsLoaded:true, contacts:cleaned_contacts})})
      AsyncStorage.setItem('hi',"well aren't ya a smart cookie for checkin this.")
      const a = await AsyncStorage.getAllKeys().then((r)=> this.setState({storageKeys:JSON.stringify(r)}))
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
      this.setState({
        contactDisabled:true
      })
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
        <View style={{backgroundColor:'black'}}>
        <Background/>

        <View style={[styles.homeContainer, this.state.homeScreen ? { display: 'flex' } : { display: 'none' }]}>
        <Header homeScreenActive={this.state.homeScreen} changeScreen={this.changeScreen} />
        <View style={styles.contactContainer}>
        <SlotMachine text={this.state.first}
                        width={30} height={50} duration={2000}
                        ref="slot" range="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.+-()[]/'… "
                        initialAnimation={false}/>
        <SlotMachine text={this.state.last}
                        width={30} height={50} duration={2000}
                        ref="slot" range="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.+-()[]/'… "
                        initialAnimation={false}/>
        </View>
        <View>


        </View>
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

        <View style={[styles.settingsContainer, !this.state.homeScreen ? {display: `flex`} : {display: `none`}]}>
        <Header homeScreenActive={this.state.homeScreen} changeScreen={this.changeScreen} />
        <Text style={styles.settingsInstructions}>Please select contacts to include:</Text>
        <ScrollView style={{top:30,height:500}} showsVerticalScrollIndicator={false}>
        <ContactList storageKeys={this.state.storageKeys} contacts={this.state.contacts}/>
        </ScrollView>
        </View>
        </View>
      )
    }
    else{
      return(<Background/>)
    }

  }

}

const styles = StyleSheet.create({
  homeContainer: {
    padding:50,
    justifyContent: "center",
    position:"absolute",
    width:"100%",
    height:"100%",
  },
  settingsContainer: {
    padding:50,
    justifyContent: "center",
    zIndex:100,
    position:"absolute",
    // height:"100%",
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
    backgroundColor: "#3959D2",
    borderColor: 'white',
    borderWidth: 3,
    height:55,
    marginTop:20,
    width:"100%",
    zIndex:1000
  },
  contactText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#3959D2",
  },
  shuffleText: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: 20
  },
  name: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: 30,
    marginTop:5
  },
  contactContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    width:'100%',
    marginLeft:50,
    marginTop:-50
  },
  buttonHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    width:'100%',
    paddingTop:300,
    marginLeft:50,
  },
  settingsInstructions:{
    fontFamily: "Roboto",
    color: "white",
    fontSize: 20,
    marginTop:80
  },
  contactButtonHolder:{
    flex: 1,
    flexDirection:'row',
    height:55
  }
});
