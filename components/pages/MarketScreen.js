import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';

// Denne skærm er den første når man trykker på market
// Den viser de kategorier der eksisterer

export default class MarketScreen extends React.Component {
  constructor(props) {
    super(props);
    // For at stoppe dumme gule warning boks i appen
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      // Sæt 'isLoading:true' når vi har et database kald vi skal have data fra. 
      // Herefter skal den setState(isLoading: false) inde i den metode/funktion som henter dataen (se exercise5_1)
      isLoading: true
    }
  }

  static navigationOptions = {
    title: "Market"
  };

  
  componentDidMount() {
    this.getItemsData();

  }

  // Henter alt data omkring "items" fra vores Firebase database
  
  getItemsData() {
    var that = this;

    return firebase.database().ref('/items/').on('value', function (snapshot) {
      // gemmer snapshottet fra databasen i 'item' som et array, og det gemmes i staten
      item = Object.values(snapshot.val());
      that.setState({
        isLoading: false,
        dataSource: item,
      });

    });


  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      )
    }

    // Laver en flatlist der viser hver item.label som er den enkelte kategori
    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <ListItem
              title={item.label}
              // onPress metoden sender skærmen over til CategoryScreen ved at ramme dens navigationOption
              // Den sender også item.label med så vi kan lave et database kald på kun den valgte kategori
              onPress={() => this.props.navigation.navigate('Category', { item: item.label })}
              avatar={
                <Image
                  style={styles.categoryImage}
                  source={{ uri: item.categoryImage }} />
              }
              titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 20, }}
              chevronColor='black'
              containerStyle={{ backgroundColor: 'transparent' }}

            />
          }
          keyExtractor={(item, index) => index.toString()}
        />

      </View>


    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    marginLeft: 5,
    marginRight: 5,

  },

  SearchBarContainer: {
    backgroundColor: "transparent",
    paddingLeft: 40,
    paddingRight: 40,
  },

  searchInputStyle: {
    paddingLeft: 80,
    paddingRight: 80,
  },

  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,

  },

});


/* Search som kan bruges senere hvis det er

<SearchBar 
          containerStyle={styles.SearchBarContainer}
          inputStyle={styles.searchInputStyle}
          showLoading
          platform="default"
          lightTheme
          round
          placeholder='Søg'
     
        />
        */
