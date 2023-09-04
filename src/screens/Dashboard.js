import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Skeleton} from 'react-native-animated-skeleton';
import {Avatar, Button} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import {useDispatch} from 'react-redux';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {api} from '../configs/api';
import {setAuth} from '../configs/redux/action/authActions';
import {colors} from '../constants/colors';
import CardAchievement from '../organism/dashboard/CardAchievement';
import CardCod from '../organism/dashboard/CardCod';
import CardPackage2 from '../organism/dashboard/CardPackage2';
import CardPackage from '../organism/dashboard/CardPackage';
import QuickAction from '../organism/dashboard/QuickAction';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [courier, setCourier] = useState(null);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [loading, setLoading] = useState(false);

  const scroll = useRef(new Animated.Value(0)).current;
  const scrollDC = Animated.diffClamp(scroll, 0, 100);
  const translateY = scrollDC.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
  });

  const handleLogout = () => {
    AsyncStorage.clear();
    dispatch(setAuth(false));
  };
  const getData = async () => {
    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));
    setCourier(courier_data);
    await api
      .get(`/courier/${courier_data.kurir_id}/summary`, {
        headers: {
          Authorization: 'Bearer ' + api_token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setData(res.data.data);
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
        }
      })
      .catch((err) => {
        const statusCode = err.response.status || 200;
        statusCode === 401
          ? handleLogout()
          : RNToasty.Error({
              title: err.message,
              position: 'center',
            });
      });
  };

  const getData2 = async (type) => {
    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));
    setCourier(courier_data);
    await api
      .get(`/${type}/transaction/summary`, {
        headers: {
          Authorization: 'Bearer ' + api_token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          type === 'harnicshop'
            ? setData2(res.data.data)
            : setData3(res.data.data);
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
        }
      })
      .catch((err) => {
        const statusCode = err.response.status || 200;
        statusCode === 401
          ? handleLogout()
          : RNToasty.Error({
              title: err.message,
              position: 'center',
            });
      });
  };

  const _handleRefresh = () => {
    setCourier(null);
    setData(null);
    setLoading(true);
    getData(1)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getData(1)
      .then(() => {
        setLoading(false);
        getData2('harnicshop');
        getData2('hervee');
      })
      .catch(() => setLoading(false));
  }, [isFocused]);

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animated.ScrollView
        onScroll={(e) => scroll.setValue(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={_handleRefresh} />
        }
        style={{backgroundColor: colors.surface}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 16,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {courier ? (
              <TouchableOpacity
                onPress={() => navigation.push('User', {data: courier})}>
                <Avatar.Image
                  size={48}
                  source={{
                    uri:
                      courier.kurir_photo || 'https://via.placeholder.com/150',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <Avatar.Image
                size={48}
                source={{
                  uri: 'https://via.placeholder.com/150',
                }}
              />
            )}
            <View style={{marginLeft: 8}}>
              {courier ? (
                <>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {courier.kurir_nama}
                  </Text>
                  <Text style={{fontSize: 12}}>{courier.area_nama}</Text>
                </>
              ) : (
                <>
                  {/* <Skeleton
                    loaderStyle={{
                      borderRadius: 4,
                      width: 150,
                      height: 24,
                      backgroundColor: '#ddd',
                      marginBottom: 4,
                    }}
                    numberOfItems={1}
                  />
                  <Skeleton
                    loaderStyle={{
                      borderRadius: 4,
                      width: 100,
                      height: 18,
                      backgroundColor: '#ddd',
                    }}
                    numberOfItems={1}
                  /> */}
                </>
              )}
            </View>
          </View>
          <Button
            style={{borderRadius: 20}}
            mode="contained"
            uppercase={false}
            color={colors.red}
            onPress={() => {
              handleLogout();
            }}>
            Log Out
          </Button>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push('Transactions', {courier: 0})}
          style={{
            margin: 16,
          }}>
          <CardPackage data={data && data.transaction} />
        </TouchableOpacity>
        <View
          style={{
            margin: 16,
          }}>
          <CardAchievement data={data && data.achievement} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.push('Cod', {courier: 0})}
          style={{
            margin: 16,
          }}>
          <CardCod data={data && data.cod} />
        </TouchableOpacity>
        {courier && courier.is_super ? (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.push('Transactions2', {title: 'Harnicshop'})
              }
              style={{
                margin: 16,
              }}>
              <CardPackage2 data={data2} title="Harnicshop" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.push('Transactions2', {title: 'Hervee'})
              }
              style={{
                margin: 16,
              }}>
              <CardPackage2 data={data3} title="Hervee" />
            </TouchableOpacity>
          </>
        ) : (
          <View />
        )}
        <View style={{height: 200}} />
      </Animated.ScrollView>
      <QuickAction success={() => _handleRefresh()} translateY={translateY} />
    </>
  );
};

export default Dashboard;
