import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {HeaderHome} from './src/components/HeaderHome/Index.js';
import {HeaderForm} from './src/components/HeaderForm/Index.js';

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HeaderHome} />
          <Stack.Screen name="Agenda" component={HeaderForm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
// Informamos qual classe será renderizada no aplicativo
export default App;
