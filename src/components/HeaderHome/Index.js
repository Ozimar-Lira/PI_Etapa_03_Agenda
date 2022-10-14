import React, {Component, useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  SeparatorItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './Styles.js';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export function HeaderHome({navigation}) {
  const dataNow = new Date();

  const Item = ({id, tarefa, data, checked, status}) => {
    return (
      <SafeAreaView style={styles.itemflex}>
        <BouncyCheckbox
          size={20}
          fillColor="red"
          isChecked={status}
          unfillColor="#FFFFFF"
          text="Fechar!"
          iconStyle={{borderColor: 'red'}}
          textStyle={{
            fontFamily: 'JosefinSans-Regular',
            textDecorationLine: 'none',
            fontWeight: 'bold',
          }}
          bounceFriction={5}
          style={styles.checkbox}
          onPress={() => confirmarFechamento({id})}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemP1}>{tarefa}</Text>
          <Text style={styles.itemP2}>{moment(data).format('DD/MM/YYYY')}</Text>
          <Text
            style={
              moment(data, 'YYYY/MM/DD').diff(
                moment(dataNow, 'YYYY/MM/DD'),
                'days',
              ) < 0
                ? styles.atrasado
                : styles.noprazo
            }>
            {moment(data, 'YYYY/MM/DD').diff(
              moment(dataNow, 'YYYY/MM/DD'),
              'days',
            ) < 0
              ? 'Atraso de:' +
                moment(data, 'YYYY/MM/DD').diff(
                  moment(dataNow, 'YYYY/MM/DD'),
                  'days',
                ) +
                'dias'
              : 'No prazo'}
          </Text>
          <Text style={checked === 1 ? styles.aberto : styles.concluido}>
            {checked === 1 ? 'Prioritária' : 'Não Prioritária'}
          </Text>
          <Text style={status === true ? styles.concluido : styles.aberto}>
            {status === true ? 'Atividade Encerrada' : 'Atividade Aberta'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => confirmarDelete({id})}
          style={styles.button}>
          <Icon size={30} color="#FFF" name="delete" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderItem = ({item}) => (
    <Item
      tarefa={item.tarefa}
      data={item.data}
      checked={item.checked}
      id={item.id}
      status={item.status}
    />
  );

  const [dados, setDados] = useState([]);

  const confirmarDelete = ({id}) =>
    Alert.alert('MENSAGEM DE ALERTA', 'Deseja apagar essa tarefa?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Deletar', onPress: () => handleRemove(id)},
    ]);

  const confirmarFechamento = ({id}) =>
    Alert.alert(
      'MENSAGEM DE ALERTA (Abrir/Encerrar Atividade',
      'Deseja alterar o status da tarefa?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Alterar o Status', onPress: () => handleAlter(id)},
      ],
    );

  async function handleAlter(id) {
    const response = await AsyncStorage.getItem('@tarefas: agenda');
    const previousData = response ? JSON.parse(response) : [];
    const index = previousData.map(item => item.id).indexOf(id);
    dados[index].status = !dados[index].status;
    AsyncStorage.setItem('@tarefas: agenda', JSON.stringify(dados));
    fetchData();
  }

  async function handleRemove(id) {
    const response = await AsyncStorage.getItem('@tarefas: agenda');
    const previousData = response ? JSON.parse(response) : [];

    const data = previousData.filter(item => item.id !== id);
    AsyncStorage.setItem('@tarefas: agenda', JSON.stringify(data));
    fetchData();
    console.log(data);
    console.log('handleRemove   ' + JSON.stringify(data));
  }

  async function fetchData() {
    const response = await AsyncStorage.getItem('@tarefas: agenda');
    const dados = response ? JSON.parse(response) : [];
    setDados(dados);
    console.log('fetchData   ' + JSON.stringify(dados));
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{uri: 'https://i.pravatar.cc/150?img=33'}}
          style={styles.avatar}
        />

        <View style={styles.user}>
          <Text style={styles.title}>Olá, Ozimar Lira</Text>
          <Text style={styles.subtitle}>Bem Vindo a sua agenda.</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Agenda')}
          style={styles.button}>
          <Icon name="create" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View>
        <SafeAreaView style={styles.containerflex}>
          <FlatList
            ItemSeparatorComponent={SeparatorItem}
            data={dados}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

export default HeaderHome;
