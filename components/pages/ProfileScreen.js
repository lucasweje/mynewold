import React from 'react';
import { ActivityIndicator, Button, View, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import firebase from 'firebase';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

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
    return firebase.database().ref('users/').once('value', function (snapshot) {
      items = Object.values(snapshot.val());
      that.setState({
        isLoading: false,
        dataSource: items,
      });
      console.log(items);
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
            title="LW"
            onPress={() => alert("stop dig selv")}
            activeOpacity={0.7}
          />

          <View style={{ marginTop: 20, }}>

            <FlatList
              data={this.state.dataSource}
              // contentContainerStyle={styles.container}
              renderItem={({ item }) =>
                <ListItem
                  title={"Name:   " + item.firstName + " " + item.lastName}
                  onPress={() => alert("hej")}
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  chevronColor='transparent'
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              data={this.state.dataSource}
              // contentContainerStyle={styles.container}
              renderItem={({ item }) =>
                <ListItem
                  title={"Gender:   " + item.gender}
                  onPress={() => alert("hej")}
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  chevronColor='transparent'
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              data={this.state.dataSource}
              // contentContainerStyle={styles.container}
              renderItem={({ item }) =>
                <ListItem
                  title={"Height:   " + item.height + " cm"}
                  onPress={() => alert("hej")}
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  chevronColor='transparent'
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              data={this.state.dataSource}
              // contentContainerStyle={styles.container}
              renderItem={({ item }) =>
                <ListItem
                  title={"Points available:   " + item.points}
                  onPress={() => alert("hej")}
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  chevronColor='transparent'
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              data={this.state.dataSource}
              // contentContainerStyle={styles.container}
              renderItem={({ item }) =>
                <ListItem
                  title={"Email:   " + item.email}
                  onPress={() => alert("hej")}
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  chevronColor='transparent'
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />


          </View>


        </ScrollView>

        <View style={{ marginBottom: 15 }}>
          <Button title="Edit profile" onPress={() => alert("DET VIRKER IKKE ENDNU SLAP AF")} color="#6AD682"></Button>
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