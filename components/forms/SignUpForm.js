import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    render() {
        return (
            <View >
                <Text style={{ fontSize: 20 }}>Sign Up</Text>

                <TextInput
                    label='Username'
                    placeholder='email@email.com'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                >
                </TextInput>

                <TextInput
                    placeholder='password'
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                >
                </TextInput>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                {this.renderButton()}
            </View>
        );
    }

    renderButton() {
        if (this.state.loading) {
            return <ActivityIndicator size='large'></ActivityIndicator>
        }
        return (
            <Button title='Sign Up' onPress={this.onButtonPress.bind(this)}></Button>
        );
    }

    // Opretter en bruger i Firebase med de intastede email og password
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({
            error: '',
            loading: true
        });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onSignUpSucces.bind(this))
            .catch(this.onSignUpFail.bind(this));
    }

    // Kan brugeren godt oprettes så laver vi et objekt med alt brugerens information sat = n/a
    // De opfordres herefter til at gå ind og udfylde informationen selv
    onSignUpSucces() {
        const { email, password } = this.state;

        var userId = firebase.auth().currentUser.uid;

        firebase.database().ref('users/' + userId).set({
            email,
            firstName: "N/A",
            lastName: "N/A",
            gender: "N/A",
            height: "N/A",
            points: "500",

        }).then((data) => {
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })


        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        alert('User created! \nRemember to fill out your information under the Profile tab')
    }

    onSignUpFail(err) {
        this.setState({
            loading: false,
            error: err.message
        });
    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
