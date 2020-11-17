import React from 'react';
import { View, Dimensions, Platform, StatusBar, Alert, BackHandler, ToastAndroid, Animated } from 'react-native';
import { Text, Button, Image, Badge } from "react-native-elements";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Home from '../screens/Login/Home';
import Service from '../screens/Login/Service';

const { height, width } = Dimensions.get('window')
StatusBar.setBarStyle('light-content');
if (Platform.OS != 'ios') { StatusBar.setBackgroundColor('black'); }

const Stack = createStackNavigator();

//Home
function HomeStackScreen() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login}
        headerMode="none"
        options={{
          headerShown: false,
        }} />
      <Stack.Screen name="Home" component={Home}
        headerMode="none"
        options={{
          headerShown: false,
        }} />
      <Stack.Screen name="Service" component={Service}
        headerMode="none"
        options={{
          headerShown: false,
        }} />
    </Stack.Navigator>
  )
};


//Main 
export default function MainNavigator() {
  return (
    <NavigationContainer>
      {HomeStackScreen()}
    </NavigationContainer>
  );
}