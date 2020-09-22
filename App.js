/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View
} from 'react-native';

import Root from './src/Root';

const App: () => React$Node = () => {
  return (
    <View style={{flex:1}}>
      <Root/>
    </View>
  );
};

export default App;
