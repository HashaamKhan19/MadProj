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

export default function LogInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Admin Log In</Text>

      <Text style={styles.email}>Email Address</Text>

      <TextInput
        style={styles.emailText}
        onChangeText={setEmail}
        placeholder="Enter Email Here"
      />
      <Text style={styles.password}>Password</Text>

      <TextInput
        style={styles.emailText}
        onChangeText={setPass}
        placeholder="Enter Password Here"
        placeholderTextColor={'black'}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('adminHome', {
            otherparam: 'Anything you want here',
          })
        }
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
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
    marginLeft: -120,
    fontFamily: 'Poppins',
    marginTop: 20,
    color: '#39AA58',
  },
  email: {
    fontFamily: 'Poppins',
    fontSize: 15,
    marginLeft: -210,
    marginTop: 20,
  },
  password: {
    fontFamily: 'Poppins',
    fontSize: 15,
    marginLeft: -238,
    marginTop: 8,
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
  },
});
