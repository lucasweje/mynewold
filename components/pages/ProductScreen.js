import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar, ListItem, PricingCard } from 'react-native-elements';
import firebase from 'firebase';
import BasketScreen from './BasketScreen';
import EventBus from 'react-native-event-bus'



// Denne skærm viser det produkt man har trykket på i CategoryScreen.js

export default class ProductSreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            price: "",
            color: "",
            size: "",
            brand: "", 
            seller: "",
            description: "",
            image: "n/a",
        }
    }

    static navigationOptions = {
        title: "Product"
    };

    // funktion der køres når der klikkes på knappen i UI
    addToBasket(item) {
        // Eventbus oprettes der 'fire et event' når knappen aktiveres
        // information om 'item' sendes til EventBus ruten "addToBasket"
        // i "BasketScreen" lytter Eventbus på hvilke items der bliver sendt
        EventBus.getInstance().fireEvent("addToBasket", {
            item
        });

        this.props.navigation.navigate('Basket', { item: item });
    }

    componentDidMount() {
        // modtager objektet item og putter det ind i items så dets attributter kan tilgås senere
        const { navigation } = this.props;
        const item = navigation.getParam('item', 'ike noge tioeither');

        // gemmer alt info omkring item i state så det kan vises i UI
        this.setState({
            dataSoruce: item,
            title: item.title,
            price: item.price,
            color: item.color,
            size: item.size,
            brand: item.brand, 
            seller: item.seller,
            description: item.description,
            image: item.image,
        });

        // HUSK FJERN DISSE KOMMENTAR HVIS VI SKAL HAVE DET RIGTIGE BILLEDE, LIGE NU ER DET RANDOM NEMLIG
        // kalder getImage med et unikt billede ID
        // this.getImage(item.image);

    }

    getImage = async (imageName) => {
        var that = this;
        // laver en referene til 'storage' hvor billeder der uploades direkte fra appen gemmes
        let storageRef = firebase.storage().ref();

        // vi går ind i 'images' mappen og giver det unikke ID vi får fra funktionene parametre 
        storageRef.child("images/" + imageName).getDownloadURL().then(function (url) {
            // gemmer url'en i state så vi kan loade billedet i app'en
            that.setState({
                image: url
            });
        });
    }

    
    render() {
        console.log(this.state.image);
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                pagingEnabled={true}
            >

                <PricingCard
                    containerStyle={styles.priceModalStyle}
                    color='#4f9deb'
                    title={this.state.title}
                    price={'Points: ' + this.state.price}
                    pricingStyle={styles.priceTextStyle}
                    info={[
                        'Color: ' + this.state.color,
                        'Size: ' + this.state.size,
                        'Brand: ' + this.state.brand,
                        'Seller: ' + this.state.seller,
                        'Description: ' + this.state.description,
                    ]}
                    button={{ title: 'Add to basket' }}
                    onButtonPress={this.addToBasket.bind(this, this.state.dataSoruce)}
                />
                <Image
                    style={styles.imageStyle}
                    source={{ uri: this.state.image }}
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

