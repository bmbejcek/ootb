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
    allowFontScaling = {false}
    pages={[
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
        title: 'Get started by hitting shuffle!',
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
