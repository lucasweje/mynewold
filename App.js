import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import BottomNavigator from './components/navigator/BottomNavigator';
import LoginForm from './components/forms/LoginForm';
import firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    }
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDsJGuZCMRlfmcjVcSany7s74Bb48ajDWE",
      authDomain: "projectmynewold.firebaseapp.com",
      databaseURL: "https://projectmynewold.firebaseio.com",
      projectId: "projectmynewold",
      storageBucket: "projectmynewold.appspot.com",
      messagingSenderId: "648339049803"
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({ loggedIn: true});
      }
      else {
        this.setState({ loggedIn: false});
      }
    });
  }

  render() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.container}>
            <BottomNavigator />
          </View>
        );

      case false:
        return (
          <View style={styles.container}>
            <LoginForm />
          </View>
        );

      default:
        return (
          <ActivityIndicator size="large"></ActivityIndicator>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch', //skal være 'stretch' her ellers bliver navigationen ikke vist
    justifyContent: 'center',
  },
});
