import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar, ListItem, PricingCard } from 'react-native-elements';
import firebase from 'firebase';
import BasketScreen from './BasketScreen';
import EventBus from 'react-native-event-bus'



// Denne skærm viser det produkt man har trykket på i CategoryScreen.js

export default class ProductSreen extends React.Component {

    static navigationOptions = {
        title: "Product"
    };

    addToBasket(item){

        EventBus.getInstance().fireEvent("addToBasket", {
            item
            
        });


        this.props.navigation.navigate('Basket', {item: item});



    }

    render() {
        const { navigation } = this.props;
        // modtager objektet item og putter det ind i items så dets attributter kan tilgås senere
        const item = navigation.getParam('item', 'ike noge tioeither');

        return (
            <ScrollView
                contentContainerStyle={styles.container}
                pagingEnabled={true}
            >

                <PricingCard
                    containerStyle={styles.priceModalStyle}
                    color='#4f9deb'
                    title={item.title}
                    price={'Points: ' + item.price}
                    pricingStyle={styles.priceTextStyle}
                    info={[
                        'Color: ' + item.color,
                        'Size: ' + item.size,
                        'Brand: ' + item.brand,
                        'Seller: ' + item.seller,
                        'Description: ' + item.description,
                    ]}
                    button={{title: 'Buy'}}
                    onButtonPress={this.addToBasket.bind(this, item)} //this.props.navigation.navigate('Basket', {item: item})}
                />
                <Image
                    style={styles.imageStyle}
                    source={{ uri: item.image }}
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

