import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import { header, outroStyles } from '../styles/index.js';

  class Header extends Component {
      render() {
          return (
            <View style = {header.background}>
              <View style = {header.container}>
                  <Text style={[header.title, outroStyles.primeiroTexto ]}>Agenda</Text>
              </View>
            </View>
          );
      }
  }
  export default Header;