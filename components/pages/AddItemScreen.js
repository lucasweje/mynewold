import React from 'react';
import { ActivityIndicator, View, Image, Text, TextInput, StyleSheet, Button, Picker, ScrollView, KeyboardAvoidingView, } from 'react-native';
import firebase from 'firebase';
import { SocialIcon } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';



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
      image: '',
      price: '',
      seller: '',
    }
  }


  static navigationOptions = {
    title: "Add item"
  };

  componentDidMount(){
    this.getSellerData();

  }


  addItemToDatabase() {

    var title = this.state.title;
    var brand = this.state.brand;
    var category = this.state.category;
    var color = this.state.color;
    var size = this.state.size;
    var description = this.state.description;
    var image = firebase.auth().currentUser.uid + title;
    var price = Math.floor((Math.random() * 100) +10);
    var result = this.state.result;
    var seller = this.state.seller;

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

            if (!result.cancelled) {
              that.uploadImage(result.uri, image)
                .then(() => {
                  alert("Success");
                })
                .catch((error) => {
                  alert(error);
                });
            }

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

  getSellerData() {
    var that = this;
     // tager currentUser for at finde kunne sætte 'seller' = den person som er logget ind
     firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', function (snapshot) {
      profileObject = snapshot.val();
      that.setState({
        seller: profileObject.firstName + " " + profileObject.lastName
      });

    });

  }

  onChooseImagePress = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    let result = await ImagePicker.launchCameraAsync();

    // let result = await ImagePicker.launchImageLibraryAsync();

    this.setState({
      result
    });
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

  render() {

    


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }

    ost = this.state.categoriesArray;

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
            <Picker.Item label="Socks" value="socks" />
            <Picker.Item label="Shoes" value="shoes" />
            <Picker.Item label="Hoodies & Sweatshirts" value="hoodiesAndSweatshirts" />
            <Picker.Item label="Dresses" value="dresses" />
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

        <View style={{ height: 50, marginBottom: 35, }}>
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

        <View style={{ flexDirection: "column", height: 50, justifyContent: "space-between", }}>

          <Button title="Take picture of item..." onPress={this.onChooseImagePress} />
          <Text>{'\n'}</Text>
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