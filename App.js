import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import BottomNavigator from './components/navigator/BottomNavigator';
import LoginForm from './components/forms/LoginForm';
import firebase from 'firebase';

export default class App extends React.Component {

  // Den aller første skærm som appen viser

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    }
  }

  // tilslutter sig til Firebase
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDsJGuZCMRlfmcjVcSany7s74Bb48ajDWE",
      authDomain: "projectmynewold.firebaseapp.com",
      databaseURL: "https://projectmynewold.firebaseio.com",
      projectId: "projectmynewold",
      storageBucket: "projectmynewold.appspot.com",
      messagingSenderId: "648339049803"
    });

    // Tjekker om en bruger er logget ind, og ændre staten herefter.
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
      // Hvis brugeren er logget ind vises BottomNavigator
      case true:
        return (
          <View style={styles.container}>
            <BottomNavigator />
          </View>
        );
      // Er der ingen bruger logget ind vises login skærmen
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
