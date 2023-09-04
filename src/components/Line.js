import React from 'react';
import {View} from 'react-native';

const Line = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 80,
          height: 4,
          backgroundColor: '#fff',
          borderRadius: 5,
          marginVertical: 8,
          marginRight: 8,
        }}
      />
      <View
        style={{
          width: 20,
          height: 4,
          backgroundColor: '#fff',
          borderRadius: 5,
          marginVertical: 8,
        }}
      />
    </View>
  );
};

export default Line;
