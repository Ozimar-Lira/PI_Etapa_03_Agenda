import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home/Index.js';
import { Form } from '../screens/Form/Index.js';
import { useNavigation } from '@react-navigation/native';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {

  console.log('Chamou o navigator')

  return (
    <NavigationContainer>
      <Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Screen name='Home' component={Home} options={{
          title: 'Bem-Vindo',
          headerStyle: {
            backgroundColor: 'black'},
          headerTintColor: 'green'
        }}
        />

        <Screen name='Form' component={Form} />
      </Navigator>
    </NavigationContainer>
  )
}