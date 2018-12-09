import React from 'react';
import { ActivityIndicator, View, Image, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';


export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  static navigationOptions = {
    title: "About"
  };

  componentDidMount() {
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 28}}>About Mynewold</Text>
        <Text>Hej Iben, dette er ABOUT screen :)</Text>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 300,
    height: 400,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
  },
});