import React, { Component, useCallback, useState } from 'react';
import { FlatList, Text, View, Button } from 'react-native';

//import { Card, CardProps } from '../../components/Card';
import { HeaderHome } from '../../components/HeaderHome/Index.js';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './Styles.js';
//import { Button } from '../../components/Button';

export function Home() {
//  const [data, setData] = useState<CardProps[]>([]);
//    console.log('Entrou na home')
  return (
    <View style={styles.container}>
      
      <HeaderHome/>

      <View style={styles.listHeader}>
        <Text style={styles.title}>
          Suas senhas
        </Text>

        <Text style={styles.listCount}>
         Texto
        </Text>
      </View>

      <FlatList
        data='data'
      // keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =><Text>Testando</Text>
        
      //    <Card
      //      data={item}
     //       onPress={() => handleRemove(item.id)}
     //     />
        }
      />

      <View style={styles.footer}>
        <Button title='Limpar Lista'></Button>

      </View>
    </View>
  );
}
