import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Title} from 'react-native-paper';

const BackButton = ({goBack, style, label}) => (
  <View style={{flexDirection: 'row', zIndex: 2}}>
    <TouchableOpacity onPress={goBack} style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={require('../assets/images/arrow_back.png')}
      />
    </TouchableOpacity>
    <Title style={{zIndex: 2, marginLeft: 8}}>{label}</Title>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginLeft: 10,
    zIndex: 1,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
