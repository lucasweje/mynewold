import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet, } from 'react-native';
import { Header, ListItem, Button, } from 'react-native-elements';
import EventBus from 'react-native-event-bus';
import firebase from 'firebase';


export default class BasketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      //    counter: 0,
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

    EventBus.getInstance().addListener("addToBasket", this.listener = data => {
      // handle the event
      var itemInBasket = that.state.dataSource;

      itemInBasket.push(data.item);


      var newTotalPrice = 0;

      itemInBasket.forEach(function (item) {

        newTotalPrice += item.price;


      });



      // gemmer arrayet under 'dataSource' i staten så det kan tilgås senere
      that.setState({
        dataSource: itemInBasket,
        //      counter: ++counter1,
        refresh: !that.state.refresh,
        totalPrice: newTotalPrice
      });
      that.forceUpdate()

    })

    
    //modtager data om det stykke tøj der ønskes tilføjet til kurv
    const { navigation } = this.props;
    const item = navigation.getParam("item", "EMPTY");
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
            <Text>Basket is empty!</Text>
          </View>
        </View>
      )
    } else {

      console.log("BASKETSCREEN")
      console.log(this.state.dataSource);

      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Basket</Text>

          <View style={styles.AndetView}>
            <FlatList
              data={this.state.dataSource}
              //      contentContainerStyle={styles.container}
              extraData={this.state.refresh}
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

          <Text>{this.state.totalPrice}</Text>


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
    flexDirection: 'row'
  },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 10,

  },
});