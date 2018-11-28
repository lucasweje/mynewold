import React from 'react';
import { ActivityIndicator, View, Image, Text, TextInput, StyleSheet, Button, Picker } from 'react-native';
import firebase from 'firebase';
import { SocialIcon } from 'react-native-elements';


export default class AddItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      title: '',
      brand: '',
      category: '',
      color: '',
      size: '',
      description: '',
      image: 'https://toldyouso.dk/images/Levis/Levis_Junior_501_Jeans_220118%20(1)-p.JPG',
      price: '100',
      seller: 'lucasweje',
    }
  }


  static navigationOptions = {
    title: "Add item"
  };


  addItemToDatabase() {
    const title = this.state.title;
    const brand = this.state.brand;
    const category = this.state.category;
    const color = this.state.color;
    const size = this.state.size;
    const description = this.state.description;
    const image = this.state.image;
    const price = this.state.price;
    const seller = this.state.seller;

    // Laver variabel 'that' til at holde 'this' da vi arbejder inde i et Firebase kald.
    var that = this;

    // Tjekker først at kateogiren er valgt fra 'Pickeren'
    if (category) {
      // Tjekker alle input feldter er fyldt ind med information
      if (title && brand && color && size && description) {
        // pusher de indtastede informationer ind på den specifikke kategori i databasen
        firebase.database().ref('items/' + this.state.category)
          .push({
            title,
            brand,
            category,
            color,
            size,
            description,
            image,
            price,
            seller,
          }).then((data) => {
            alert("Adding item was a succes");
            // Sætter state til blank for at cleare textinputs
            that.setState({
              title: '',
              brand: '',
              category: '',
              color: '',
              size: '',
              description: '',
            })
          }).catch((error) => {
            console.log('error', error);
          })
      } else {
        alert("You need to fill out all the input fields");
      }
    } else {
      alert("Remember to pick a category");
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <View style={{ height: 50, marginBottom: 15, }}>
          <Text style={{ alignSelf: "center" }}>Title of product:</Text>
          <TextInput
            label='Title'
            // placeholder='title of product'
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
            style={styles.textInputBorder}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={{ height: 50, marginBottom: 15, }}>
          <Text style={{ alignSelf: "center" }}>Brand:</Text>
          <TextInput
            label='brand'
            // placeholder='brand of product'
            value={this.state.brand}
            onChangeText={brand => this.setState({ brand })}
            style={styles.textInputBorder}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={{ height: 50, marginBottom: 0, }}>
          <Text style={{ alignSelf: "center" }}>Category:</Text>
          {/* En "dropdown" picker der kun giver brugere mulighed for at vælge de kategorier vi har oprettet */} 
          <Picker
            selectedValue={this.state.category}
            onValueChange={itemValue => this.setState({ category: itemValue })}
            style={{ marginTop: -15 }}
          >
            <Picker.Item label="Choose category:" value="" />
            <Picker.Item label="Pants" value="pants" />
            <Picker.Item label="T-shirts" value="t-shirts" />
          </Picker>
        </View>

        <View style={{ height: 50, marginBottom: 15, }}>
          <Text style={{ alignSelf: "center" }}>Color:</Text>
          <TextInput
            label='color'
            // placeholder='color of product'
            value={this.state.color}
            onChangeText={color => this.setState({ color })}
            style={styles.textInputBorder}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={{ height: 50, marginBottom: 15, }}>
          <Text style={{ alignSelf: "center" }}>Size:</Text>
          <TextInput
            label='size'
            // placeholder='size of product'
            value={this.state.size}
            onChangeText={size => this.setState({ size })}
            style={styles.textInputBorder}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={{ height: 50, marginBottom: 15, }}>
          <Text style={{ alignSelf: "center" }}>Description:</Text>
          <TextInput
            label='description'
            // placeholder='description of product'
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
            style={styles.textInputBorder}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={{ height: 50, justifyContent: "space-around", }}>
          <Button
            onPress={() => this.addItemToDatabase()}
            title='Add item to store'
            color='#2B8144'
          >
          </Button>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'stretch',
    paddingTop: 20,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "#fff",
  },
  textInputBorder: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  }
});