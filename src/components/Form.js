import React, {Component, useState, useEffect} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/pt-br';
import {form} from '../styles/index.js';
import uuid from 'react-native-uuid';
import HeaderHome from './HeaderHome/Index.js';
import App from '../../App.js';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {enableLatestRenderer} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

enableLatestRenderer();

const Form = () => {
  moment.updateLocale('pt-br');
  const [tarefa, setTarefa] = useState('');
  const [data, setData] = useState(new Date());
  const [checked, setChecked] = useState(0);
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    getMyLocation();
  }, []);

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      info => {
        console.log('latitude', info.coords.latitude);
        console.log('longitude', info.coords.longitude);

        setRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      () => {
        console.log('deu erro no carregamento do mapa');
      },
      {enableHighAccuracy: true, timeout: 2000},
    );
  }

  async function requestPermissions() {
    console.log('entrou na funcao');
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        console.log('You can use the app');
      } else {
        console.log('Location Permission Denied');
      }
      error => {
        console.warn(error);
      };
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(granted, PermissionsAndroid.RESULTS.GRANTED);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the app');
      } else {
        console.log('Location Permission Denied');
        console.log(granted, PermissionsAndroid.RESULTS.GRANTED);
      }
    }
  }

  const hasLocationPermission = async () => {
    console.log('entrou na funcao hasLocation');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.LOCATION,
      {
        title: 'Cool Weather App',
        message: 'Cool Weather App needs access to use your location',
        buttonNegative: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the app');
      } else {
        console.log('Location Permission Denied');
        console.log(error.code, error.message);
      }
      error => {
        console.warn(error);
      };
    }
  };

  function componentDidMount() {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position.coords.latitude, position.coords.longitude);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  async function saveDados() {
    try {
      const id = uuid.v4();
      const newDados = {
        id,
        tarefa,
        data,
        checked,
        status,
      };

      const response = await AsyncStorage.getItem('@tarefas: agenda');
      const previusDados = response ? JSON.parse(response) : [];
      const dados = [...previusDados, newDados];

      await AsyncStorage.setItem('@tarefas: agenda', JSON.stringify(dados));

      Toast.show({
        type: 'sucess',
        text1: 'Cadastrado com Sucesso',
      });
      console.log(newDados);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro no AsyncStorage',
      });
      console.log(error);
    }
  }

  /*  async function listDados() {
          try {
              const response = await AsyncStorage.getItem("@tarefas: agenda");
              const dados = response ? JSON.parse(response) : [];
              setDados(dados);
  
              Toast.show({
                  type: 'sucess',
                  text1: 'Listagem emitida com Sucesso'
              })
              console.log(dados);
          }
          catch (error) {
              Toast.show({
                  type: 'error',
                  text1: 'Erro na Listagem'
              })
              console.log(error);
  
          }
          return (dados);
  
      }
      
   <Text/>
  
  
   ***** Chamada parra função Listagem
              <View>
                  /* Chamamos nossos States para serem exibidos os valores 
                  <Text>Tarefa: {tarefa}</Text>
                  <Text>Prioridade: {checked} </Text>
                  <Text>Data: {String(data)}</Text>
              </View>
              <Text/>
               <Button title="Listar" onPress={listDados} style={form.button}></Button>
  
    ***** Chamadando o datetime
   
               < View >
                < Button title="Escolha a data da tarefa" onPress={showDatePicker} />
                < DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <Text />
     
     
 
 
 
               */

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setOpen(false);
  };

  const handleConfirm = date => {
    console.log('Uma data foi escolhida:' + date);
    hideDatePicker();
    setOpen(false);
    setData(date);
  };

  return (
    <View style={form.container}>
      <Text></Text>
      <Text style={form.texts}>Nova Tarefa: </Text>
      <Text></Text>
      <TextInput
        placeholder="Insira uma nova Tarefa"
        style={form.input}
        onChangeText={text => setTarefa(text)}
      />
      <Text></Text>
      <BouncyCheckbox
        size={20}
        //    padding={30}
        justifyContent="center"
        fillColor="red"
        unfillColor="#FFFFFF"
        text="Prioridade!"
        iconStyle={{borderColor: 'red'}}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          textDecorationLine: 'none',
          fontWeight: 'bold',
          padding: 15,
          //   height: 50,
          //   width: "100%",
          backgroundColor: '#ffc484',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        bounceFriction={5}
        style={form.checkbox}
        onPress={() => setChecked(checked === 0 ? 1 : 0)}
      />
      <Text></Text>
      <Text style={form.texts}>Data Tarefa: </Text>
      <Text></Text>
      <View style={form.container}>
        <TouchableOpacity
          onPress={() => {
            setOpen(true), setStatus(false);
          }}
          style={form.input}>
          <Text style={form.data}>{moment(data).format('DD/MM/YYYY')}</Text>
        </TouchableOpacity>
        <DatePicker
          format="DD-MM-YYYY"
          modal
          mode="date"
          open={open}
          date={data}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View>
        <View style={form.countContainer}>
          <Text>Geolocalização: {(latitude, longitude)} </Text>
          <TouchableOpacity style={form.button} onPress={componentDidMount}>
            <Text style={form.textButton}>LOCALIZAÇÃO</Text>
          </TouchableOpacity>
        </View>
        <View style={form.container_map}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            onMapReady={() => {
              Platform.OS === 'android'
                ? PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  ).then(() => {
                    console.log('Mapa aceitou');
                  })
                : '';
            }}
            style={form.map}
            region={region}
            zoomEnabled={true}
            minZoomLevel={17}
            showsUserLocation={true}
            loadingEnabled={true}
          />
        </View>
        <Text></Text>
        <View style={form.countContainer}>
          <TouchableOpacity style={form.button} onPress={saveDados}>
            <Text style={form.textButton}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Form;
