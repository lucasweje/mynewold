import React from 'react';
import { ActivityIndicator, FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';

// Denne skærm viser hvilke produkter der ligge inde under den specifikke kategori

export default class CategorySreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],

        }
    }

    static navigationOptions = {
        title: "Category"
    };

    componentDidMount() {

        // Modtager den valgte kategorien som string fra den forrige skærm
        const { navigation } = this.props;
        const items = navigation.getParam('item', 'No cateogory');

        this.getItemsData(items.toLowerCase());

    }

    getItemsData(category) {
        var that = this;

        return firebase.database().ref('/items/' + category).on('value', function (snapshot) {
            // Der laves et Array rundt om item (det kræver en FlatList), herefter filtreres alle de elementer som ikke indeholder 'brand' væk
            // Det gøres for at fjerne kategoriens eget 'billede' og 'overskrift' strings, så de ikke vises i FlatListen
            const data = Object.values(snapshot.val()).filter(item => {
                if (item.hasOwnProperty('brand')) {
                    return item;
                }
            });

             // laver et array der kun indeholder tøj objektets image attribut
            var imageID = [];
            for (var i = 0; i < data.length; i++) {
                imageID.push(data[i].image);
            }

            // kalder funktionen der henter URL der er knyttet til tøjet imageID
            that.getImage(imageID, data);

        });

    }

    getImage = async (imageID, data) => {
        var that = this;
        // laver en referene til 'storage' hvor billeder der uploades direkte fra appen gemmes
        let storageRef = firebase.storage().ref();

        var imageURL = [];

        // loopet kører igennem imageID's længde så vi finder en URL til hvert imageID
        for (var i = 0; i < imageID.length; i++) {

            // vi går ind i 'images' mappen og giver det unikke ID vi får fra imageID
            // PROBLEM: getDownloadURL() er async så det er ikke altid at billede og tøj matcher.
            storageRef.child("images/" + imageID[i])
                .getDownloadURL()
                // fanger hvis der er fejl, returnerer "n/a" så billedet i FlatList bliver tomt i stedet for app'en crasher
                .catch(err => {
                    return "n/a";
                })
                .then(function (url) {
                    // vi pusher URL'en der hører til det unikke ID ind i et tomt array
                    imageURL.push(url);

                    // er længden på ID array'et og URL array'et den samme er vi sikre på alle billeder er kommet med
                    if (imageURL.length === imageID.length) {
                        that.changeUrlInArray(imageURL, data);
                    }
                });

        }

    }

    changeUrlInArray(imageURL, realData) {
        // Kører igennem hele længden på vores array
        for (var i = 0; i < realData.length; i++) {
            // sætter "image" i array'et lig med URL fra firebase så hvert stykke tøj kan vise sit billede
            realData[i].image = imageURL[i];
        }

        this.setState({
            dataSource: realData,
        });
    }


    render() {
        // opretter dataSource som objekt så vi kan tjekke dens længde
        const data = this.state.dataSource;

        if (data.length !== 0) {
            return (
                <FlatList
                    data={data}
                    contentContainerStyle={styles.container}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item.title}
                            subtitle={'Points: ' + item.price}
                            // sender det item der er trykket på med som et objekt til ProductScreen 
                            onPress={() => this.props.navigation.navigate('Product', { item: item })}
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

        } else {
            return (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, }}>Sorry, no items for sale yet :(</Text>
                </View>
            );
        }


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
        resizeMode: "contain",
        width: 80,
        height: 80,
        borderRadius: 30,

    },

});
