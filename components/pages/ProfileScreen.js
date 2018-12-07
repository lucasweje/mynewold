import React from 'react';
import { ActivityIndicator, Button, View, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import UpdateProfileScreen from './UpdateProfileScreen';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: "empty",
      lastName: "",
      gender: "",
      height: "",
      email: "",
      points: "",

    }
  }

  static navigationOptions = {
    title: "Profile"
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    var that = this;
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', function (snapshot) {
      // gemmer data både som et JSON objekt og et Array så det både kan bruges i FlastList og sendes videre til UpdateProfile skærmen
      profileObject = snapshot.val();
      profileArray = Object.values(snapshot.val());
      console.log(profileObject);
      that.setState({
        isLoading: false,
        dataSource: profileArray,
        profileObject: profileObject,

        firstName: profileObject.firstName,
        lastName: profileObject.lastName,
        gender: profileObject.gender,
        height: profileObject.height,
        email: profileObject.email,
        points: profileObject.points,
      });


    });
  };

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
        <ScrollView style={styles.AndetView}>
          <Avatar
            large
            rounded
            title={this.state.firstName.charAt(0) + this.state.lastName.charAt(0)}
            onPress={() => alert("stop dig selv")}
            activeOpacity={0.7}
          />


          <View style={{ marginTop: 20, }}>

            <ListItem
              title={"Name:   " + this.state.firstName + " " + this.state.lastName}
              onPress={() => alert("hej")}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Gender:   " + this.state.gender}
              onPress={() => alert("hej")}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Height:   " + this.state.height + " cm"}
              onPress={() => alert("hej")}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Email:   " + this.state.email}
              onPress={() => alert("hej")}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Points:   " + this.state.points}
              onPress={() => alert("hej")}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />

          </View>


        </ScrollView>

        <View style={{ marginBottom: 15 }}>
          <Button title="Edit profile" onPress={() => this.props.navigation.navigate('UpdateProfile', { item: this.state.profileObject })} color="#6AD682"></Button>
          <Text>{'\n'}</Text>
          <Button title="Log out" onPress={() => firebase.auth().signOut()} color='red'></Button>
        </View>


      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    marginRight: 50,
    marginLeft: 50,
  },
  AndetView: {
    height: 100,
    marginBottom: 20,
    flexDirection: 'row',

  },
  listContainer: {

  }
});