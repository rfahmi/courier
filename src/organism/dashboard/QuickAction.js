import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, Animated, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import {api} from '../../configs/api';
import {colors} from '../../constants/colors';
import {currencyFormat} from '../../utils/formatter';

const QuickAction = ({success, translateY}) => {
  const [loading, setLoading] = useState(false);
  const pickup = async (e) => {
    setLoading(true);
    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));
    await api
      .post(
        `/courier/${courier_data.kurir_id}/transaction/${e}/pickup`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + api_token,
          },
        },
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          success();
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
  const receiveSnap = async (trx) => {
    setLoading(true);

    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));
    await api
      .get(`/courier/${courier_data.kurir_id}/transaction/${trx}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + api_token,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          console.log(res.data.data);
          if (Number(res.data.data?.payment_method_code) === 3) {
            Alert.alert(
              'Pesanan COD',
              `Dengan menekan tombol SETUJU, anda telah menyetujui dan bertanggungjawab atas pesanan senilai ${currencyFormat(
                res.data.data.total,
              )}`,
              [
                {
                  text: 'Batalkan',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Setuju',
                  onPress: () =>
                    navigation.push('Snap', {
                      action: receive,
                      param: trx,
                      type: 'back',
                    }),
                },
              ],
              {cancelable: false},
            );
          } else {
            navigation.push('Snap', {
              action: receive,
              param: trx,
              type: 'back',
            });
          }
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
  const receive = async (photo, trx) => {
    setLoading(true);
    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));

    const body = new FormData();
    body.append('photo', {
      uri: photo,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    await api
      .post(
        `/courier/${courier_data.kurir_id}/transaction/${trx}/receive`,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + api_token,
          },
        },
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          success();
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
  const navigation = useNavigation();
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        transform: [{translateY}],
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: -14,
          left: 16,
          right: 16,
          margin: 0,
          height: 300,
          borderRadius: 15,
          backgroundColor: 'rgba(200,200,200,0.5)',
          transform: [{translateY: translateY}],
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: -4,
          left: 8,
          right: 8,
          margin: 0,
          height: 300,
          borderRadius: 15,
          backgroundColor: 'rgba(200,200,200,0.9)',
          transform: [{translateY: translateY}],
        }}
      />
      <Animated.View
        style={{
          marginTop: 6,
          paddingVertical: 40,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: colors.primaryDark,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 80,
            right: 80,
            height: 6,
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 20,
          }}
        />
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 150,
            }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <>
            <View style={{alignItems: 'center'}}>
              <IconButton
                icon="qrcode-scan"
                size={55}
                style={{backgroundColor: colors.white}}
                color={colors.primaryDark}
                onPress={() => navigation.push('Scan', {action: pickup})}
              />
              <Text style={{color: colors.surface}}>Pick-Up</Text>
            </View>
            <IconButton icon="chevron-right" color={colors.white} size={42} />
            <View style={{alignItems: 'center'}}>
              <IconButton
                icon="check"
                size={55}
                style={{backgroundColor: colors.white}}
                color={colors.primaryDark}
                onPress={() => navigation.push('Scan', {action: receiveSnap})}
              />
              <Text style={{color: colors.surface}}>Selesai</Text>
            </View>
          </>
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default QuickAction;
