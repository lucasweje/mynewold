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
    
    }




    render() {
        // Modtager data fra den forrige skærm
        const { navigation } = this.props;
        const items = navigation.getParam('item', 'ike noge tioeither');


        // Der laves et Array rundt om item (det kræver en FlatList), herefter filtreres alle de elementer som ikke indeholder 'brand'
        // Det gøres for at fjerne kategoriens eget 'billede' og 'overskrift' strings, så de ikke vises i FlatListen
        const data = Object.values(items).filter(item => {
            if (item.hasOwnProperty('brand')) {
                return item;
            }
        });



        return (
            <FlatList
                data={data}
                contentContainerStyle={styles.container}
                renderItem={({ item }) =>
                    <ListItem
                        title={item.title}
                        subtitle={'Points: ' + item.price}
                        // sender item fra forrige skærm med igen som et objekt 
                        onPress={() => this.props.navigation.navigate('Product', {item: item})}
                        avatar={
                            <Image
                                style={styles.categoryImage}
                                source={{ uri: item.image }} />
                        }
                        titleStyle={{ color: 'black', fontSize: 16 }}
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
