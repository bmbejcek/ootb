import React, { useState } from "react";
import { View, Image, Text } from "react-native";


export default class Background extends React.Component {
render(){
return(
  <View style={{backgroundColor:`#3959D2`, height:`100%`, zIndex:-100}}>
  <Image
  style={{position: 'absolute', top:0, marginLeft:-150, zIndex:-100}}
  source={require('./../assets/header.png')}
  />
  <Image
  style={{position: 'absolute', bottom:0, marginLeft:-150, zIndex:-100}}
  source={require('./../assets/footer.png')}
  />
  <View style={{width:`80%`, bottom:0, marginBottom:40,position:`absolute`, alignItems:`center`}}>
  <View style={{flex:1, flexDirection: 'row', width:`100%`}}>
    <Text style={{marginLeft:`10%`,fontFamily:`Roboto`,color:`white`}}> Contact Us | About Us </Text>
  </View>
  </View>
  </View>
)
}

}
