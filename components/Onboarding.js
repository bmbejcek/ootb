import { Image, Text, View } from 'react-native';
import React from 'react';
import { AsyncStorage } from "react-native";
import { connect } from 'react-redux'
import { finishOnboarding } from './../redux/actions';
import { Button } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Onboarding from 'react-native-onboarding-swiper';

class Simple extends React.Component {
log_done = async() => {
AsyncStorage.setItem('onboarding',"complete")
this.props.finishOnboarding();
}

render(){
  const { contacts } = this.props;
  return(
  <Onboarding
    titleStyles={{fontFamily:`BebasNeue_400Regular`}}
    nextLabel={<Text style={{fontFamily:`BebasNeue_400Regular`, fontSize:RFPercentage(2.5)}}>Next</Text>}
    onDone={() => this.log_done()}
    showSkip = {false}
    transitionAnimationDuration = {100}
    pages={[
      {
        backgroundColor: '#fff',
        title: "Social media has changed the way we communicate.",
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: "We have shifted from a world of heartfelt conversations to a world of passive likes.",
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
            {
        backgroundColor: '#fff',
        title: "This is my attempt to change that.",
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: 'You have ' + contacts.length + " contacts on your phone.",
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: "That is " + contacts.length + " ideas to be exchanged, " + contacts.length + " laughs to be shared, and " + contacts.length + " memories to be made.",
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: 'Next time you have the urge to go check social media, why don’t you get a real dose of human connection by using this tool?',
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: 'I made this as a gift just for you, free from ads and analytics tracking. Simply hit shuffle and get a friend to text or call.',
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: 'What are you waiting for?! Let's go and build a conversation first world!',
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
    ]}
  />)
}}


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
        onboarded: state.reducers.onboarded
    }
}

const mapDispatchToProps = dispatch => {
    return {
      finishOnboarding: () => {
        dispatch(finishOnboarding())
      },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Simple);
