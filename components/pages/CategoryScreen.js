import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';

// Denne skærm viser hvilke produkter der ligge inde under den specifikke kategori

export default class CategorySreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    static navigationOptions = {
        title: "Category"
    };

    componentDidMount() {
        this.getItemsData();
    }

    getItemsData() {
        var that = this;
        // Databasen retunerer den kategori inde i items/ som der er trykke på i MarketScreen
        // Det gøres ved at sende label med til CategoryScreen i onPress metoden i MarketScreen flatlist
        // og her kaldes det label og sættes ind i referænce punktet i database kaldet 
        return firebase.database().ref('items/' + this.props.navigation.state.params.label).once('value', function (snapshot) {
            items = Object.values(snapshot.val());
            that.setState({
                isLoading: false,
                dataSource: items,
            });   
           
        });
    };


    render() {
        // Behøver ikke dise to linjer mere efter vi henter data på ny i linje 30
        //  const { navigation } = this.props;
        //  const title = navigation.getParam('items'); 
         

        return (
            <FlatList
                data={this.state.dataSource}
                contentContainerStyle={styles.container}
                renderItem={({ item }) =>
                    <ListItem
                        title={item.title}
                        subtitle={'Points: ' + item.price}
                        onPress={() => this.props.navigation.navigate('Product', item) & console.log(item)}                    
                        avatar={
                            <Image
                                style={styles.categoryImage}
                                source={{ uri: item.image }} />
                        }
                        titleStyle={{color: 'black', fontSize: 16}}
                        subtitleStyle={{ color: 'black', fontWeight: "normal", fontSize: 12, }}
                        chevronColor='black'
                        containerStyle={{ backgroundColor: 'transparent' }}

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
        alignItems: 'stretch',
        height: 200,
        // justifyContent: 'center',

    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 10,

    },

});
