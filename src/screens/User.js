import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, IconButton} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import TextInput from '../components/TextInput';
import {api} from '../configs/api';
import {colors} from '../constants/colors';
import {passwordValidator} from '../utils/validator';

const User = ({navigation, route}) => {
  const {data} = route.params;
  const [loading, setLoading] = useState(false);
  const [old, setOld] = useState({value: '', error: ''});
  const [new1, setNew1] = useState({value: '', error: ''});
  const [new2, setNew2] = useState({value: '', error: ''});

  const uploadPhoto = async (photo) => {
    const api_token = await AsyncStorage.getItem('api_token');

    const body = new FormData();
    body.append('photo', {
      uri: photo,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    await api
      .post(`/courier/${data.kurir_id}/photo`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + api_token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const new_data = {...data, kurir_photo: res.data.data};
          console.log(new_data);
          AsyncStorage.setItem('courier_data', JSON.stringify(new_data));
          navigation.goBack();
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
        console.log('err', JSON.parse(JSON.stringify(err)));
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  };

  const updateData = async (id) => {
    const api_token = await AsyncStorage.getItem('api_token');
    const oldError = passwordValidator(old.value);
    const newError = passwordValidator(new1.value);
    if (oldError || newError) {
      setOld({...old, error: oldError});
      setNew1({...new1, error: newError});
      setLoading(false);
      return;
    }
    if (new2.value !== new1.value) {
      setNew2({...new2, error: 'Password tidak sama'});
      setLoading(false);
      return;
    }
    await api
      .post(
        `/courier/${data.kurir_id}/password`,
        qs.stringify({old: old.value, new: new2.value}),
        {
          headers: {
            Authorization: 'Bearer ' + api_token,
          },
        },
      )
      .then((res) => {
        if (res.data.success) {
          navigation.goBack();
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
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  };

  return (
    <>
      <ScrollView style={{padding: 16}}>
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('Snap', {action: uploadPhoto, type: 'front'})
            }>
            <Avatar.Image
              size={200}
              source={{
                uri: data.kurir_photo || 'https://via.placeholder.com/150',
              }}
            />
            <IconButton
              icon="pencil"
              color={colors.white}
              style={{
                backgroundColor: colors.primary,
                position: 'absolute',
                bottom: 4,
                right: 10,
              }}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>
            {data.kurir_nama}
          </Text>
        </View>
        <TextInput
          mode="flat"
          label="Password Lama"
          returnKeyType="next"
          value={old.value}
          onChangeText={(text) => setOld({value: text, error: ''})}
          error={!!old.error}
          errorText={old.error}
          autoCapitalize="none"
        />
        <TextInput
          mode="flat"
          label="Password Baru"
          returnKeyType="next"
          value={new1.value}
          onChangeText={(text) => setNew1({value: text, error: ''})}
          error={!!new1.error}
          errorText={new1.error}
          autoCapitalize="none"
        />
        <TextInput
          mode="flat"
          label="Ulangi Password Baru"
          returnKeyType="next"
          value={new2.value}
          onChangeText={(text) => setNew2({value: text, error: ''})}
          error={!!new2.error}
          errorText={new2.error}
          autoCapitalize="none"
        />
      </ScrollView>
      <View style={{padding: 16}}>
        <Button
          style={{width: '100%', marginVertical: 10, zIndex: 0}}
          labelStyle={{fontWeight: 'bold', fontSize: 15, lineHeight: 26}}
          disabled={loading}
          loading={loading && <ActivityIndicator size="small" />}
          mode="contained"
          onPress={() => updateData(data.kurir_id)}>
          UPDATE
        </Button>
      </View>
    </>
  );
};

export default User;
