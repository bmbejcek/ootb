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
console.log('done')
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
        title: 'You have ' + contacts.length + " contacts on your phone, but you don't communicate with most of them.",
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: 'We fall into habits of talking to the same people about the same things.',
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: 'Out of the Blue is the modern day equivalent of running into an old friend at a coffeeshop.',
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: 'Simply shuffle a random contact and reconnect via call or text.',
        subtitle:'',
        image: <Image source={require('./../assets/o.png')} />,
      },
      {
        backgroundColor: '#fff',
        title: "Let's build a conversation-first culture together.",
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
