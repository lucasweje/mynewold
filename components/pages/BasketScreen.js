import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet, } from 'react-native';
import { Header, ListItem, Button, } from 'react-native-elements';
import firebase from 'firebase';


export default class BasketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

    }
  }

  static navigationOptions = {
    title: "Basket"
  };

  componentDidMount() {
    // modtager data om det stykke tøj der ønskes tilføjet til kurv
    const { navigation } = this.props;
    const item = navigation.getParam("item", "EMPTY");

    console.log("objekt");
    console.log(item);

    // laver et array og pusher tøj objektet ind i array'et
    const itemInBasket = [];
    itemInBasket.push(item);

    // gemmer arrayet under 'dataSource' i staten så det kan tilgås senere
    this.setState({
      dataSoruce: itemInBasket,
    });

  }

  render() {

    console.log("array");
    console.log(this.state.dataSoruce);

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
          <ActivityIndicator />
        </View>
      )
      // tjekker om der er tøj i array'et 
    } if (this.state.dataSoruce == "EMPTY") {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Basket</Text>

          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Text>Basket is empty!</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Basket</Text>

          <View style={styles.AndetView}>
            <FlatList
              data={this.state.dataSoruce}
              contentContainerStyle={styles.container}
              renderItem={({ item }) =>
                <ListItem
                  title={item.title}
                  subtitle={'Points: ' + item.price}
                  avatar={
                    <Image
                      style={styles.categoryImage}
                      source={{ uri: item.image }} />
                  }
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  subtitleStyle={{ color: 'black', fontWeight: "normal", fontSize: 12, }}
                  chevronColor='transparent'
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
  },
  AndetView: {
    height: 100,
    marginBottom: 20,
    flexDirection: 'row',

  },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 10,

  },
});