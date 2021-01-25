/* eslint-disable max-len */
/* eslint-disable global-require */
import _ from 'lodash';
import React, { Component } from 'react';
import { } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { id: 1, progress: 0.1, text: 'Welcome To Dream Job, Swipe To Continue', color: '#2B7A78', image: require('../images/swipe_1.png') },
  { id: 3, progress: 0.2, text: 'Set Up your Account and Log In', color: '#2B7A78', image: require('../images/swipe_3.png') },
  { id: 2, progress: 0.3, text: 'Set your location , then see the jobs around', color: '#2B7A78', image: require('../images/swipe_2.png') },
  { id: 4, progress: 0.4, text: 'Swipe through jobs you like and save them to your list', color: '#2B7A78', image: require('../images/swipe_4.png') },
  { id: 5, progress: 0.5, text: 'You completed the tutorial, press the button to Continue', color: '#2B7A78', image: require('../images/swipe_5.png') },
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('COMPLETED');
    if (token) {
      this.props.navigation.navigate('LogInScreen');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onCompletedTutorial = async () => {
    try {
      await AsyncStorage.setItem('COMPLETED');
    } catch (e) {
      console.log(e);
    }
    this.props.navigation.navigate('LogInScreen');
  }
  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
      }
      return (
        <Slides
          onCompletedTutorial={this.onCompletedTutorial}
          data={SLIDE_DATA} 
        />
    );
    }
}

export default WelcomeScreen;
