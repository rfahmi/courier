import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
import React, {memo, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import {useDispatch} from 'react-redux';
import Background from '../components/Background';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import {api} from '../configs/api';
import {setAuth} from '../configs/redux/action/authActions';
import {passwordValidator, phoneValidator} from '../utils/validator';

const Auth = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState({value: null, error: ''});
  const [password, setPassword] = useState({value: null, error: ''});
  const [loading, setLoading] = useState(false);
  const _onLoginPressed = () => {
    setLoading(true);
    const phoneError = phoneValidator(phone.value);
    const passwordError = passwordValidator(password.value);

    if (phoneError || passwordError) {
      setPhone({...phone, error: phoneError});
      setPassword({...password, error: passwordError});
      setLoading(false);
      return;
    }
    api
      .post(
        '/courier/signin',
        qs.stringify({phone: phone.value, password: password.value}),
      )
      .then(async (res) => {
        setLoading(false);
        if (res.data.success) {
          dispatch(setAuth(true));
          AsyncStorage.setItem('api_token', res.data.data.api_token);
          AsyncStorage.setItem(
            'courier_data',
            JSON.stringify(res.data.data.kurir),
          );
          RNToasty.Success({
            title: res.data.message,
            position: 'bottom',
          });
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  };

  return (
    <>
      <View style={{padding: 16, flex: 1}}>
        <Background>
          <FocusAwareStatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Logo />
          <TextInput
            label="Nomor HP"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({value: text, error: ''})}
            error={!!phone.error}
            errorText={phone.error}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <Button
            style={{width: '100%', marginVertical: 10, zIndex: 0}}
            labelStyle={{fontWeight: 'bold', fontSize: 15, lineHeight: 26}}
            disabled={loading}
            loading={loading && <ActivityIndicator size="small" />}
            mode="contained"
            onPress={_onLoginPressed}>
            Login
          </Button>
        </Background>
      </View>
    </>
  );
};

export default memo(Auth);
