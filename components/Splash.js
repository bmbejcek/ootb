import React, { useState } from "react";
import { View, Image, Text } from "react-native";


export default class Splash extends React.Component {
render(){
return(
  <View style={{height:`100%`, width:`100%`}}>
  <Image style={{height:`100%`, width:`100%`}}
  source={require('./../assets/splash.png')}
  />
  </View>
)
}

}
