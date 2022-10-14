import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Button, TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { styles } from './_Styles.js';
import { HeaderForm } from '../../components/HeaderForm/Index.js';

export function Form() {
  console.log('Entrou na Form')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <TextInput
              placeholder="Insira uma nova Tarefa"
            />
            <TextInput
              placeholder="Insira uma nova Tarefa"
              
            />
            <TextInput
              placeholder="Insira uma nova Tarefa"
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}