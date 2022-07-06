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
  LogBox,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {enableLatestRenderer} from 'react-native-maps';

import LogInScreen from './components/LogInScreen';
import SignUpScreen from './components/SignUpScreen';
import UserHomePage from './components/UserHomePage';
import AdminHomePage from './components/AdminHomePage';
import ViewStore from './components/ViewStore';
import SignInAdmin from './components/SignInAdmin';
import ViewMap from './components/ViewMap';

const stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!user && (
          <>
            <stack.Screen name="Home" component={LogInScreen} />
            <stack.Screen name="signup" component={SignUpScreen} />
            <stack.Screen name="signinadmin" component={SignInAdmin} />
          </>
        )}
        {user && (
          <>
            {user.email == 'admin@gmail.com' && (
              <stack.Screen name="adminHome" component={AdminHomePage} />
            )}
            {user.email != 'admin@gmail.com' && (
              <>
                <stack.Screen name="userHome" component={UserHomePage} />
                <stack.Screen name="store" component={ViewStore} />
                <stack.Screen name="map" component={ViewMap} />
              </>
            )}
          </>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
}
