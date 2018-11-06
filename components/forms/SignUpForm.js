import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

export default class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    render() {
        return(
            <View>
            <TextInput
                label='Username'
                placeholder='email@email.com'
                value={this.state.email}
                onChangeText={email => this.setState({email})}
            >
            </TextInput>

            <TextInput
                placeholder='password'
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={password => this.setState({password})}
            >
            </TextInput>

            <Text style={styles.errorTextStyle}>
                {this.state.error}
            </Text>

            {this.renderButton()}
            </View>
        );      
    }

    renderButton(){
        if(this.state.loading) {
            return <ActivityIndicator size='large'></ActivityIndicator>
        }
        return(
            <Button title='Sign Up' onPress={this.onButtonPress.bind(this)}></Button>
        );
    }

    onButtonPress() {
        const {email, password } = this.state;

        this.setState({
            error: '',
            loading: true
        });

        firebase.auth().createUserWithEmailAndPassword( email, password)
            .then(this.onSignUpSucces.bind(this))
            .catch(this.onSignUpFail.bind(this));
    }

    onSignUpSucces() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        alert('User created!')
    }

    onSignUpFail(err){
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
