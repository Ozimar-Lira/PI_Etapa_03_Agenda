import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text } from 'react-native';
import Form from '../Form.js';

export function HeaderForm() {
  const navigation = useNavigation();
  return (
    <View>
      <Form></Form>
    </View>
  );
}