import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar, ListItem, PricingCard } from 'react-native-elements';
import firebase from 'firebase';

// Denne skærm viser det produkt man har trykket på i CategoryScreen.js

export default class ProductSreen extends React.Component {

    static navigationOptions = {
        title: "Product"
    };

    render() {
        const { navigation } = this.props;

        const title = navigation.getParam('title', 'no title found')
        const description = navigation.getParam('description', 'no Description found');
        const price = navigation.getParam('price', 'no price found')
        const seller = navigation.getParam('seller', 'no seller found')
        const color = navigation.getParam('color', 'no color found')
        const size = navigation.getParam('size', 'no size found')
        const brand = navigation.getParam('brand', 'no brand found')
        const image = navigation.getParam('image', 'no image foind')

        console.log(image);

        return (
            <ScrollView
                contentContainerStyle={styles.container}
                pagingEnabled={true}
            >
                <PricingCard
                    containerStyle={styles.priceModalStyle}
                    color='#4f9deb'
                    title={title}
                    price={'Points: ' + price}
                    pricingStyle={styles.priceTextStyle}
                    info={[
                        'Color: ' + color,
                        'Size: ' + size,
                        'Brand: ' + brand,
                        'Seller: ' + seller,
                        'Description: ' + description,
                    ]}
                    button={{title: 'Buy'}}
                    // onButtonPress={alert('du trkkede?')} // aktiverer når man trykker på varen i listen, ikke når man trykker på knappen
                />
                <Image
                    style={styles.imageStyle}
                    source={{ uri: image }}
                />
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    imageStyle: {
        resizeMode: 'contain', 
        width: 300,
        height: 400, 
        marginLeft: 25, 
        marginRight: 25, 
        borderRadius: 10,

    },
    priceModalStyle: {
        borderRadius: 10,
        
    },
    priceTextStyle: {
        color: 'red',

    },

});

