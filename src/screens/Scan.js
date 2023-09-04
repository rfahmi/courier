import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
// import RNBeep from 'react-native-a-beep';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {Button, TextInput} from 'react-native-paper';

const Scan = ({navigation, route}) => {
  const {action} = route.params;
  const isFocused = useIsFocused();
  const [trxno, setTrxno] = useState(null);

  const onBarCodeRead = (scanResult) => {
    // RNBeep.beep();
    navigation.goBack();
    action(scanResult.data);
    return;
  };

  const onManualSubmit = () => {
    // RNBeep.beep();
    navigation.goBack();
    action(trxno);
    return;
  };

  return (
    <KeyboardAvoidingView style={styles.root}>
      <View style={styles.upperSection}>
        <RNCamera
          onBarCodeRead={isFocused ? onBarCodeRead : null}
          style={styles.preview}>
          <BarcodeMask
            width={300}
            height={300}
            showAnimatedLine={true}
            outerMaskOpacity={0.8}
          />
        </RNCamera>
      </View>
      <View
        style={{
          backgroundColor: '#ddd',
          padding: 16,
        }}>
        <TextInput
          mode="flat"
          label="Manual Input"
          returnKeyType="done"
          value={trxno}
          onChangeText={(text) => setTrxno(text)}
          autoCapitalize="none"
        />
        <Button
          style={{width: '100%', marginVertical: 10, zIndex: 0}}
          labelStyle={{fontWeight: 'bold', fontSize: 15, lineHeight: 26}}
          disabled={!trxno}
          mode="contained"
          onPress={onManualSubmit}>
          SUBMIT
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  root: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  upperSection: {
    flex: 1,
  },
  camera: {
    height: '100%',
  },
};

export default Scan;
