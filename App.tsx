import React from 'react';
import { View, StyleSheet } from 'react-native';

import EditPhoto from './src/screen/EditPhoto'

const App = () => {
  return (
    // <View style={styles.container}>
    <EditPhoto />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App