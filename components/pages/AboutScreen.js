import React from 'react';
import { ActivityIndicator, View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

// Sker ikke noget specielt på denne her skærm
// Er bare hardcoded med en masse tekst

export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  static navigationOptions = {
    title: "About"
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
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
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>About mynewold</Text>

        <View style={styles.AndetView}>

          <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>We are</Text>
          <Text>
            We are a start-up of 3 friends based in Copenhagen.
            {"\n"}{"\n"}We want to make it possible to refresh your wardrobe without spending money or using resources that affect the enviroment.
            {"\n"}{"\n"}Lorem ipsum dolor sit amet, ipsum volutpat libero, justo ultricies amet. Vehicula semper sed suspendisse eleifend tempor, elit id est. Magna fames aliquam ut, morbi montes in, eu at lorem duis cras velit, sit augue. Scelerisque suscipit, aliquet nec nullam enim integer.
            {"\n"}{"\n"}Lorem ipsum dolor sit amet, ipsum volutpat libero, justo ultricies amet. Vehicula semper sed suspendisse eleifend tempor, elit id est. Magna fames aliquam ut, morbi montes in, eu at lorem duis cras velit, sit augue. Scelerisque suscipit, aliquet nec nullam enim integer.
          </Text>

        </View>

        <View style={styles.AndetView}>

          <Text style={{ fontSize: 18, textDecorationLine: "underline"}}>How it works</Text>
          <Text>Step 1:{"\n"}
            Add items of clothing you no longer want or have a need for to the market.
          </Text>
          <Text>{"\n"}Step 2:{"\n"}
            When they have been recieved by a 'mynewold' warehouse and made it's way through our quality control,
            our algorithm will determine the amount of points the item is worth, which will be added to your account.
          </Text>
          <Text>{"\n"}Step 3:{"\n"}
            Browse through the market and spend your points on clothing other people have added to the market.
          </Text>

        </View>

        <View style={styles.AndetView}>

          <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>Payment and Delivery</Text>
          <Text>
            Lorem ipsum dolor sit amet, ipsum volutpat libero, justo ultricies amet. Vehicula semper sed suspendisse eleifend tempor, elit id est. Magna fames aliquam ut, morbi montes in, eu at lorem duis cras velit, sit augue. Scelerisque suscipit, aliquet nec nullam enim integer.
            {"\n"}{"\n"}Lorem ipsum dolor sit amet, ipsum volutpat libero, justo ultricies amet. Vehicula semper sed suspendisse eleifend tempor, elit id est. Magna fames aliquam ut, morbi montes in, eu at lorem duis cras velit, sit augue. Scelerisque suscipit, aliquet nec nullam enim integer.
          </Text>

        </View>

      </ScrollView>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
    paddingRight: 15,
    marginRight: 5,
    marginLeft: 20,

  },
  AndetView: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'column'
  },
});