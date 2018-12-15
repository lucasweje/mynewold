import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './SignUpForm'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            hasLogin: true,
        }
    }

    render() {
        // Viser som default case=true, men hvis der trykke på "Sign Up" ændre hasLogin i staten sig til false og SignUpForm bliver vist
        switch (this.state.hasLogin) {
            case true:
                return (                   
                    <View style={{ flex: 1, padding: 40, justifyContent: 'center', alignItems: 'stretch' }}>

                        <Text style={{ fontSize: 20}}>Sign In</Text>

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

                        {this.renderButton("Login", this.onButtonPresssSignIn.bind(this))}
                        <Text>{'\n'}</Text>
                        {this.renderButton("Sign Up With New Account", this.onButtonPressSetLoginFalse.bind(this))}
                    </View>
                );

            case false:
                return (
                    <View style={{ flex: 1, padding: 40, justifyContent: 'center', alignItems: 'stretch' }}>
                        <SignUpForm />
                        <Text>{'\n'}</Text>
                        {/* Go Back knappen sætter hasLogin i state = true, og derefter ændre View sig tilbage til LoginForm */}
                        {this.renderButton("Go back", this.onButtonPressSetLoginTrue.bind(this))}
                    </View>
                );

            default:
                return (
                    <ActivityIndicator size="large"></ActivityIndicator>
                );
        }

    }


    onButtonPressSetLoginTrue() {
        this.setState({
            hasLogin: true
        });
    }

    onButtonPressSetLoginFalse() {
        this.setState({
            hasLogin: false
        });
    }

    renderButton(title, onPressMethod) {
        if (this.state.loading) {
            return <ActivityIndicator size='large'></ActivityIndicator>
        }
        return (
            <Button title={title} onPress={onPressMethod}></Button>
        );
    }

    // metoden henter de indtastede oplysninger fra staten og laver derefter et firebase.auth() kald der forsøger at logge ind
    onButtonPresssSignIn() {
        const { email, password } = this.state;

        this.setState({
            error: '',
            loading: true
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucces.bind(this))
            .catch(this.onLoginFail.bind(this));
    }

    onLoginSucces() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        alert('User signed in!')
    }

    onLoginFail(err) {
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
