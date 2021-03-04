import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Container from './components/Container'
import store from './redux/store'
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { View, Text } from "react-native";

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1.0;

function App() {
  let [fontsLoaded] = useFonts({
      BebasNeue_400Regular,
    });
  if (fontsLoaded){
return (
<Provider store={store}>
<Container/>
</Provider>
);
}
else {
  return(<View/>)
}
}

export default App;
