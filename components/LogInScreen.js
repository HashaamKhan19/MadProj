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
import auth from '@react-native-firebase/auth';

export default function LogInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const adminEmail = 'admin@gmail.com';
  const adminPassword = 123456;

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FloraGenic</Text>

      <Image
        style={styles.tinyLogo}
        source={require('../assets/floraGenicLogo.png')}
      />

      <Text style={styles.login}>Log In</Text>

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
          navigation.navigate('userHome', {
            otherparam: 'Anything you want here',
          })
        }
        style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={handleSignIn}>
          Log In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('signup', {
            otherparam: 'Anything you want here',
          })
        }
        style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* <Text style={styles.signInAs}>
        Sign in as
        {' '}
        <Text
          onPress={() => navigation.navigate ('adminHome')}
          style={styles.signInAsInside}
        >
          admin
        </Text>
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 40,
    fontFamily: 'Poppins-SemiBold',
    color: '#39AA58',
    letterSpacing: 3,
  },
  tinyLogo: {
    height: 131,
    width: 131,
    marginTop: 23,
  },
  login: {
    fontSize: 28,
    marginLeft: -230,
    fontFamily: 'Poppins-Regular',
    marginTop: 20,
    color: 'black',
  },
  email: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    marginLeft: -208,
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
    paddingLeft: 11,
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
  signUpButton: {
    width: 320,
    height: 39,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 20,
    marginLeft: 11,
  },
  signUpButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#39AA58',
    padding: 6,
    fontFamily: 'Poppins-Medium',
  },
  signInAs: {
    fontFamily: 'Poppins',
    marginTop: 20,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  signInAsInside: {
    color: '#008133',
  },
});
