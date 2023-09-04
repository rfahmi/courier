import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import qs from 'qs';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Button, Caption, Title} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import {api} from '../../configs/api';
import {colors} from '../../constants/colors';
import Empty from '../empty';
import ListSkeleton from '../skeleton/ListSkeleton';
import TransactionListItem from './TransactionListItem';

const TransactionList = ({status, option}) => {
  const modalizeRef = useRef(null);
  const isFocused = useIsFocused();
  const limit = 20;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);

  const getData = async (p) => {
    console.log('limit', limit);
    console.log('page', p);
    console.log('status', status);
    const api_token = await AsyncStorage.getItem('api_token');
    const result = await api
      .get(`/${option}/transaction?page=${p}&limit=${limit}&status=${status}`, {
        headers: {
          Authorization: 'Bearer ' + api_token,
        },
      })
      .then((res) => {
        console.log(res.data.data.length);
        if (res.data.success) {
          if (p > 1) {
            setData([...data, ...res.data.data]);
          } else {
            setData(res.data.data);
          }
          if (res.data.data.length < limit) {
            setHasMore(false);
          }
          setPage(p + 1);
          return true;
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
          return false;
        }
      })
      .catch((err) => {
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
        return false;
      });
    return result;
  };

  const send = async (trxno) => {
    setProgress(true);
    const api_token = await AsyncStorage.getItem('api_token');
    await api
      .put(`/${option}/transaction/${trxno}`, qs.stringify({status: 3}), {
        headers: {
          Authorization: 'Bearer ' + api_token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          modalizeRef.current?.close();
          RNToasty.Success({
            title: res.data.message,
            position: 'bottom',
          });
          _handleRefresh();
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
        }
        setProgress(false);
      })
      .catch((err) => {
        setProgress(false);
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  };

  const _handleRefresh = () => {
    setData(null);
    setLoading(true);
    setPage(1);
    getData(1)
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    getData(page)
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isFocused]);

  const onLoadMore = () => {
    getData(page)
      .then(() => {
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => setLoading(false));
  };

  const keyExtractor = (item, index) => {
    return String(item.salesid);
  };

  const _renderItems = ({item}) => {
    return (
      <TransactionListItem
        onPress={() => {
          if (Number(item.status) === 0) {
            setSelected(item);
            modalizeRef.current?.open();
          }
        }}
        key={`trx${item.trxno}`}
        item={item}
        option={option}
      />
    );
  };

  return (
    <>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={_handleRefresh} />
        }
        ListEmptyComponent={
          !loading && (
            <Empty
              image="problem_solving"
              title="Tidak ada pesanan disini"
              caption="Coba cari di tab lainnya"
            />
          )
        }
        style={{backgroundColor: '#fff'}}
        contentContainerStyle={{paddingVertical: 12, flexGrow: 1}}
        renderItem={_renderItems}
        horizontal={false}
        keyExtractor={keyExtractor}
        onEndReached={onLoadMore}
        ListFooterComponent={hasMore && loading ? <ListSkeleton /> : <View />}
        onEndThreshold={0.3}
        removeClippedSubviews
        initialNumToRender={limit}
        maxToRenderPerBatch={limit}
      />
      <Modalize
        ref={modalizeRef}
        onClose={() => setSelected(null)}
        modalStyle={{flex: 1, zIndex: 9}}
        modalHeight={Dimensions.get('window').height / 2}>
        <View style={{flex: 1, padding: 16}}>
          <Title>Konfirmasi Pengiriman</Title>
          <Caption>Status pesanan akan berubah menjadi DIKIRIM</Caption>
          <View
            style={{backgroundColor: colors.note, padding: 16, marginTop: 8}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 4}}>
              Ringkasan Pesanan
            </Text>
            <Text style={{fontSize: 13}}>
              Online Shop: {selected && selected.sourcename}
            </Text>
            <Text style={{fontSize: 13}}>
              Nomor Pesanan: {selected && selected.trxno}
            </Text>
            <Text style={{fontSize: 13}}>
              Customer: {selected && selected.custname}
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 16}}>
            <Button
              style={{width: '100%', marginVertical: 10, zIndex: 0}}
              labelStyle={{fontWeight: 'bold', fontSize: 15, lineHeight: 26}}
              disabled={progress}
              loading={progress && <ActivityIndicator size="small" />}
              mode="contained"
              onPress={() => selected && send(selected.trxno)}>
              Sudah Dikirim
            </Button>
          </View>
        </View>
      </Modalize>
    </>
  );
};

export default memo(TransactionList);
