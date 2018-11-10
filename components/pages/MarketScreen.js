import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';

// Denne skærm er den første når man trykker på market
// Den viser de kategorier der eksisterer

export default class MarketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Sæt 'isLoading:true' når vi har et database kald vi skal have data fra. 
      // Herefter skal den setState(isLoading: false) inde i den metode/funktion som henter dataen (se exercise5_1)
      isLoading: false
    }
  }

  static navigationOptions = {
    title: "Market"
  };

  componentDidMount() {
    this.getItemsData();
  }

  getItemsData() {
    var that = this;
    return firebase.database().ref('items').on('value', function (snapshot) {
      items = Object.values(snapshot.val());
      that.setState({
        isLoading: false,
        dataSource: items,        
      });
    });
   
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
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) =>
          <ListItem
            title={item.label}
            onPress={() => this.props.navigation.navigate('Category', item) & console.log(item)}                   

                
          />
        }
        keyExtractor={(item, index) => index.toString()}
      />

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', //Her kan den godt sættes til 'center' for at teksten kommer til at være i midten
    justifyContent: 'center',
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
