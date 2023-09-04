import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {IconButton} from 'react-native-paper';
import {colors} from '../constants/colors';

const Snap = ({navigation, route}) => {
  const cameraRef = useRef(null);
  const {action, param, type} = route.params;
  let type_use = RNCamera.Constants.Type.back;

  if (type === 'front') {
    type_use = RNCamera.Constants.Type.front;
  } else {
    type_use = RNCamera.Constants.Type.back;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.3, base64: true};
      const data = await cameraRef.current?.takePictureAsync(options);
      navigation.goBack();
      action(data.uri, param);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: 24,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <Text style={{color: colors.grayLight}}>
          Pastikan kondisi cahaya optimal
        </Text>
      </View>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={type_use}
        flashMode={RNCamera.Constants.FlashMode.auto}>
        {({camera, status}) => {
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <IconButton
                icon="camera"
                size={50}
                color={colors.white}
                onPress={() => takePicture(camera)}
              />
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Snap;
