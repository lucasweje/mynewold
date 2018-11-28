import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';


export default class BasketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  static navigationOptions = {
    title: "Basket"
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'ike noge tioeither');


    console.log("hej");
    console.log(item);

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <Text style={{ fontSize: 60}}>Hej</Text>

        <View style={styles.container}>

          <Text>Hej Daniel, detter er BASKET Screen</Text>
          <Text>{item.title}</Text>
        </View>

      </View>



    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});