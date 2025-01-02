// import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import MovieScreen from './screens/MovieScreen';
import PersonScreen from './screens/PersonScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name='Movie' component={MovieScreen}/>
          <Stack.Screen name='Person' component={PersonScreen}/>
          <Stack.Screen name='Search' component={SearchScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }