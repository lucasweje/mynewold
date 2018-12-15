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

  // Henter data omkring brugeren
  getUserData() {
    var that = this;
    // tager currentUser for at finde deres specifikke data
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', function (snapshot) {
      
      // gemmer data både som et JSON objekt og et Array så det både kan bruges i FlastList og sendes videre til UpdateProfile skærmen
      profileObject = snapshot.val();
      profileArray = Object.values(snapshot.val());

      that.setState({
        isLoading: false,
        dataSource: profileArray,
        profileObject: profileObject,

        // gemmer data i staten om brugeren der er logget ind
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
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Gender:   " + this.state.gender}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Height:   " + this.state.height + " cm"}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Email:   " + this.state.email}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
            <ListItem
              title={"Points:   " + this.state.points}
              titleStyle={{ color: 'black', fontSize: 16 }}
              chevronColor='transparent'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
          </View>



        </ScrollView>

        
        <View style={{ marginBottom: 20 }}>
          <Button title="Edit profile" onPress={() => this.props.navigation.navigate('UpdateProfile', { item: this.state.profileObject })} color="#2B8144"></Button>
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
    marginBottom: 5,
    flexDirection: 'column',

  },
  listContainer: {

  }
});