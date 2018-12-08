import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet, Button, } from 'react-native';
import { ListItem, } from 'react-native-elements';
import EventBus from 'react-native-event-bus';
import firebase from 'firebase';


export default class BasketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // Laver et tomt array der bruges som "basket" 
      dataSource: [],
      refresh: false,
      totalPrice: 0
    }
  }

  static navigationOptions = {
    title: "Basket"
  };


  /*

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextprops")
    //console.log("nextprops test",nextProps)
    console.log("nextstate")
    //console.log(nextState)

    let getProps = Object.values(nextProps)
    let getState = Object.values(getProps[1])
    let test1 = Object.values(getState[3].params)
    let data = test1[0];

    let itemInBasket = []
    itemInBasket.push(data)
    
    console.log(itemInBasket)
    
    this.setState({
      dataSource: itemInBasket
    })
    

    return true;  
  }

  */

  componentDidMount() {
    var that = this;

    // Opretter en EventBus Listener der lytter på ruten "addToBasket"
    // Den lytter for at se om vi tilføjer noget tøj til vores kurv --> se "ProductScreen"
    EventBus.getInstance().addListener("addToBasket", this.listener = data => {
      // handle the event
      var itemInBasket = that.state.dataSource;
      itemInBasket.push(data.item);

      // finder tøjet i Basket's totale værdi ved og gå igennem hele arrayet gemmer den i "newTotalPrice"
      // parseInt() fordi price gemmes som String i databasen
      var newTotalPrice = 0;
      itemInBasket.forEach(function (item) {
        newTotalPrice += parseInt(item.price);
      });

      // gemmer arrayet og den totale pris under i staten 
      that.setState({
        dataSource: itemInBasket,
        refresh: !that.state.refresh,
        totalPrice: newTotalPrice
      });
      that.forceUpdate();
    })

    // Fordi EventBus først kan modtage data når vi i app'en har været inde under "Basket tab" 
    // sikrer vi os her at når der sendes tøj første gang modtager vi det gennem navigation params
    const { navigation } = this.props;
    const item = navigation.getParam("item", "EMPTY");
    //tjekker at Params ikke er tom før vi laver et array til et stykke tøj
    if (item !== "EMPTY") {

      // laver et array og pusher tøj objektet ind i array'et
      var itemInBasket = this.state.dataSource;
      itemInBasket.push(item);

      // gemmer arrayet under 'dataSource' i staten så det kan tilgås senere
      this.setState({
        dataSource: itemInBasket,
        totalPrice: item.price
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
          <ActivityIndicator />
        </View>
      )
      // tjekker om der er tøj i array'et 
    } if (this.state.dataSource.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Basket</Text>

          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 22, }}>Basket is empty!</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Basket</Text>

          <View style={styles.AndetView}>
            <FlatList
              data={this.state.dataSource}
              extraData={this.state.refresh}
              renderItem={({ item }) =>
                <ListItem
                  title={item.title}
                  subtitle={'Points: ' + item.price}
                  // avatar={
                  //   <Image
                  //     style={styles.categoryImage}
                  //     source={{ uri: item.image }} />
                  // }
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  subtitleStyle={{ color: 'black', fontWeight: "normal", fontSize: 12, }}
                  chevronColor='transparent'
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 40 }}>Total price:  {this.state.totalPrice} points</Text>
            <Button
              title="Checkout"
              color='#2B8144'
              onPress={() => alert("Items in basket has been purchased!") & this.setState({dataSource: []})}
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
    height: '80%',
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row'
  },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 10,

  },
});