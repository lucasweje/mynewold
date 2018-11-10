import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Denne skærm viser hvilke produkter der ligge inde under den specifikke kategori

export default class CategorySreen extends React.Component {

    static navigationOptions = {
        title: "Category"
    };

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'no title');

        return (
            <View style={infoText.container}>
                <Text>Product Info</Text>
                <Text>Title: {title}</Text>
        
            </View>
        );
    }
}


const infoText = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
