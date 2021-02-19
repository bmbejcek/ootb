import { Image } from 'react-native';
import React from 'react';
import { AsyncStorage} from "react-native";


import Onboarding from 'react-native-onboarding-swiper';

log_done = async() => {
AsyncStorage.setItem('onboarding',"complete")
console.log('done')
}

const Simple = () => (
  <Onboarding
    onDone={() => this.log_done()}
    pages={[
      {
        backgroundColor: '#fff',
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fe6e58',
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);

export default Simple;
