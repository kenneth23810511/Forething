'use strict';

import {StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
export const colors  = {
  transparent: 'transparent',
  primary: '#D1EEEE',
  secondary: '#BFEFFF',
  tertiary: '#9FB6CD',
  buttonDefault: '#7CCD7C',
  buttonBorderDefault: '#53868B',
  buttonseparatorLine: '#fff',
  buttonText: '#fff',
  borderDefault: '#CED0CE',
  inputDefault: '#fff'
}

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin'
}