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
    this.getPants();
  }

  getPants = async () => {
    var that = this;
    firebase.database().ref('/items/pants').once('value', function (snapshot) {
      items = Object.values(snapshot.val());

      items.forEach(function (item) {
        if (item.image === "XIzFFqqilbXylADE93ONnbmcJy23Hhjr") {
          console.log("indeni GETPANTS");
          console.log(item.image);

          var image = that.getImage(item.image);
        }
      });

    });
  }

  getImage = async (imageName) => {
    var that = this;
    console.log("GETIMAGE FUNKTION");
    let storageRef = firebase.storage().ref();

    storageRef.child("images/" + imageName).getDownloadURL().then(function (url) {
      console.log(url);
      that.setState({
        image: url
      });
      console.log(that.state.image);

    });

    // const url = ref.getDownloadURL().then((url)=> console.log(url));


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
        <Text h1>About Mynewold</Text>
        <Text>Hej Iben, dette er ABOUT screen :)</Text>
        <Image
          style={styles.imageStyle}
          source={{ uri: this.state.image }}
        />

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