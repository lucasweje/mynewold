import React from 'react';
import { ActivityIndicator, View, Image, Text, TextInput, StyleSheet, Button, Picker, } from 'react-native';
import firebase from 'firebase';
import { SocialIcon } from 'react-native-elements';


export default class AddItemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            firstName: '',
            lastName: '',
            gender: '',
            height: '',
            email: '',

        }
    }


    static navigationOptions = {
        title: "UpdateProfile"
    };

    componentDidMount() {
        // modtager objektet item og putter det ind i 'item' så det kan vises inde i tekstInput
        // så behøver man kun at redigere det man ønsker, og ikke taste alting igen

        const { navigation } = this.props;    
        const item = navigation.getParam('item', 'ike noge tioeither');

        this.setState({
            firstName: item.firstName,
            lastName: item.lastName,
            gender: item.gender,
            // laver højde til String det Firebase kræver dette
            height: JSON.stringify(item.height),
            email: item.email,
        });

    }

    goBack(){
        const { navigation } = this.props;    
        navigation.goBack();
    }


    updateDatabase() {
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const gender = this.state.gender;
        const height = this.state.height;
        const email = this.state.email;


        // Laver variabel 'that' til at holde 'this' da vi arbejder inde i et Firebase kald.
        var that = this;

        // Tjekker først at gender er valgt fra 'Pickeren'
        if (gender) {
            // Tjekker alle input feldter er fyldt ind med information
            if (firstName && lastName && height && email) {
                // updatere databse med de indtastede informationer, men for nu kun på 'lucasweje'
                firebase.database().ref('users/' + firebase.auth().currentUser.uid)
                    .update({
                        firstName,
                        lastName,
                        gender,
                        height,
                        email,
                    }).then((data) => {
                        alert("Updating was a succes");
                    }).catch((error) => {
                        console.log('error', error);
                    })
            } else {
                alert("You need to fill out all the input fields");
            }
        } else {
            alert("Remember to pick a gender");
        }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={styles.container}>

                <View style={{ height: 50, marginBottom: 15, }}>
                    <Text style={{ alignSelf: "center" }}>First name:</Text>
                    <TextInput
                        label='First name'
                        // placeholder={item.lucasweje.firstName}
                        value={this.state.firstName}
                        onChangeText={firstName => this.setState({ firstName })}
                        style={styles.textInputBorder}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={{ height: 50, marginBottom: 15, }}>
                    <Text style={{ alignSelf: "center" }}>Last name:</Text>
                    <TextInput
                        label='Last name'
                        // placeholder={item.lucasweje.lastName}
                        value={this.state.lastName}
                        onChangeText={lastName => this.setState({ lastName })}
                        style={styles.textInputBorder}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={{ height: 50, marginBottom: 0, }}>
                    <Text style={{ alignSelf: "center" }}>Gender:</Text>
                    {/* En "dropdown" picker der kun giver brugere mulighed for at vælge mellem mand og kvinde */}
                    <Picker
                        selectedValue={this.state.gender}
                        onValueChange={itemValue => this.setState({ gender: itemValue })}
                        style={{ marginTop: -15 }}
                    >
                        <Picker.Item label="Choose gender:" value="" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                </View>

                <View style={{ height: 50, marginBottom: 15, }}>
                    <Text style={{ alignSelf: "center" }}>Height (cm):</Text>
                    <TextInput
                        label='height'
                        // placeholder={item.lucasweje.height}
                        value={this.state.height}
                        onChangeText={height => this.setState({ height })}
                        style={styles.textInputBorder}
                        underlineColorAndroid='transparent'

                    />
                </View>

                <View style={{ height: 50, marginBottom: 15, }}>
                    <Text style={{ alignSelf: "center" }}>Email:</Text>
                    <TextInput
                        label='email'
                        // placeholder={item.lucasweje.email}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={styles.textInputBorder}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={{ height: 50, justifyContent: "space-around", }}>
                    <Button
                        onPress={() => this.updateDatabase() & this.goBack() }
                        title='Update profile information'
                        color='#2B8144'
                    >
                    </Button>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
        paddingTop: 20,
        paddingRight: 50,
        paddingLeft: 50,
        backgroundColor: "#fff",
    },
    textInputBorder: {
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    }
});