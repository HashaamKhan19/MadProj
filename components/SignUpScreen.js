import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import auth from '@react-native-firebase/auth';

export default function LogInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Sign Up</Text>

      <Text style={styles.email}>Email Address</Text>

      <TextInput
        style={styles.emailText}
        onChangeText={setEmail}
        placeholder="Enter Email Here"
        placeholderTextColor={'lightgrey'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.password}>Password</Text>

      <TextInput
        style={styles.emailText}
        onChangeText={setPass}
        placeholder="Enter Password Here"
        placeholderTextColor={'lightgrey'}
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Home', {
            otherparam: 'Anything you want here',
          })
        }
        style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={handleSignUp}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: -230,
  },
  login: {
    fontSize: 34,
    marginLeft: -190,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    color: '#39AA58',
  },
  email: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    marginLeft: -210,
    marginTop: 20,
    color: 'black',
  },
  password: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    marginLeft: -238,
    marginTop: 8,
    color: 'black',
  },
  emailText: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginTop: 5,
    width: 315,
    marginRight: -12,
    height: 35,
    paddingLeft: 10,
    fontFamily: 'Poppins-Italic',
    paddingBottom: 7,
    color: 'black',
  },
  loginButton: {
    width: 320,
    height: 39,
    borderRadius: 20,
    backgroundColor: '#31A051',
    marginTop: 20,
    marginLeft: 11,
    elevation: 7,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    padding: 6,
    fontFamily: 'Poppins-Medium',
  },
});
