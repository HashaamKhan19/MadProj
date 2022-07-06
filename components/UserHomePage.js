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
  ImageBackground,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import auth from '@react-native-firebase/auth';

export default function UserHomePage({navigation, route}) {
  return (
    <View style={styles.container}>
      <View style={styles.store}>
        <ImageBackground
          source={require('../assets/Frame.png')}
          resizeMode="cover"
          imageStyle={{borderRadius: 15}}
          style={styles.image}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('store', {
                otherparam: 'Anything you want here',
              })
            }
            style={styles.storeBtn}>
            <Text style={styles.storetext}>VIEW STORE</Text>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/loupe.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.store}>
        <ImageBackground
          source={require('../assets/Frame.png')}
          resizeMode="cover"
          imageStyle={{borderRadius: 15}}
          style={styles.image}>
          <TouchableOpacity style={styles.storeBtn}
          onPress={() =>
            navigation.push('map', {
              otherparam: 'Anything you want here',
            })
          }>
            <Text style={styles.storetext}>VIEW MAP</Text>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/loupe.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View>
        <TouchableOpacity>
          <Text style={styles.backbtn} onPress={() => auth().signOut()}>
            LogOut
          </Text>
        </TouchableOpacity>
      </View>
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
  store: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  image: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 195,
    width: 195,
  },
  storeBtn: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 135,
    height: 135,
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.5,
  },
  tinyLogo: {
    width: 35,
    height: 35,
    marginTop: 12,
  },
  storetext: {
    fontSize: 22,
    color: '#1d5233',
    opacity: 1,
    marginTop: 5,
    fontFamily: 'Poppins-Bold',
  },
  backbtn: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    top: 80,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  },
});
