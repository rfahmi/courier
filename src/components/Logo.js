import React, {memo} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';

const Logo = () => (
  <View
    style={{
      width: useWindowDimensions().width,
      aspectRatio: 1 / 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Image
      source={require('../assets/images/harnic.png')}
      style={styles.image}
    />
    <Text style={{fontWeight: 'bold', fontSize: 18, color: '#555'}}>
      Delivery App
    </Text>
  </View>
);

const styles = StyleSheet.create({
  image: {
    aspectRatio: 4 / 1,
    resizeMode: 'contain',
    marginBottom: 12,
  },
});

export default memo(Logo);
