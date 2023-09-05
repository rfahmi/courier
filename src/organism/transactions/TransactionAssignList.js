import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import qs from 'qs';
import React, {memo, useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, RefreshControl, Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Caption, FAB, Title} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import {api} from '../../configs/api';
import {colors} from '../../constants/colors';
import {currencyFormat} from '../../utils/formatter';
import Empty from '../empty';
import ListSkeleton from '../skeleton/ListSkeleton';
import TransactionListItem from './TransactionListItem';

const TransactionAssignList = () => {
  const modalizeRef = useRef(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const limit = 8;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);

  const getData = async (p) => {
    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));
    const result = await api
      .get(
        `/courier/${courier_data.kurir_id}/transaction/assigned?page=${p}&limit=${limit}`,
        {
          headers: {
            Authorization: 'Bearer ' + api_token,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
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

  const codApproval = async (value, change) => {
    modalizeRef.current?.open();
    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));
    await api
      .post(
        `/courier/${courier_data.kurir_id}/cod/approval`,
        qs.stringify({value, change}),
        {
          headers: {
            Authorization: 'Bearer ' + api_token,
          },
        },
      )
      .then((res) => {
        if (!res.data.success) {
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

  const codPayment = async (otp) => {
    const api_token = await AsyncStorage.getItem('api_token');
    const courier_data = JSON.parse(await AsyncStorage.getItem('courier_data'));
    const transactions = selected.map((x) => x.trxno).join();
    await api
      .post(
        `/courier/${courier_data.kurir_id}/cod/payment`,
        qs.stringify({transactions, otp}),
        {
          headers: {
            Authorization: 'Bearer ' + api_token,
          },
        },
      )
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
      })
      .catch((err) => {
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  };

  const _handleRefresh = () => {
    setSelected([]);
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
    setSelected([]);
    setLoading(true);
    setPage(1);
    getData(page)
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isFocused]);

  useEffect(() => {
    selected.length > 0 && setShowFab(true);
  }, [selected]);

  const onLoadMore = () => {
    getData(page)
      .then(() => {
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => setLoading(false));
  };

  const addSelected = async (item) => {
    setSelected([...selected, item]);
    return true;
  };
  const deleteSelected = async (item) => {
    setSelected(selected.filter((e) => e !== item));

    return true;
  };

  const keyExtractor = (item, index) => {
    return String(item.salesid);
  };

  const selectedTotal = selected.reduce((a, b) => a + (b.total || 0), 0);
  const selectedChange = selected.reduce(
    (a, b) => a + (b.change_value || 0),
    0,
  );

  const _renderItems = ({item}) => {
    const isSelected = selected.find((e) => e === item);
    return (
      <TransactionListItem
        onPress={() => navigation.push('TransactionView', {data: item})}
        key={`trx${item.trxno}`}
        item={item}
        isSelected={isSelected}
        deleteSelected={deleteSelected}
        addSelected={addSelected}
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
        onOpen={() => setShowFab(false)}
        onClose={() => setSelected([])}
        modalStyle={{flex: 1, zIndex: 9}}
        modalHeight={Dimensions.get('window').height / 2}>
        <View style={{flex: 1, padding: 16}}>
          <Title>Pemeriksaan Keamanan</Title>
          <Caption>Meminta persetujuan supervisor melalui telegram</Caption>
          <View
            style={{backgroundColor: colors.note, padding: 16, marginTop: 8}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 4}}>
              Ringkasan Setoran
            </Text>
            <Text style={{fontSize: 11}}>
              Jumlah Pesanan: {selected.length} Pesanan
            </Text>
            <Text style={{fontSize: 11}}>
              Nominal Pesanan: Rp{currencyFormat(selectedTotal)}
            </Text>
            <Text style={{fontSize: 11}}>
              Nominal Kembalian: Rp{currencyFormat(selectedChange)}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <OTPInputView
              style={{width: '70%', height: 200}}
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={{
                width: 40,
                height: 45,
                borderWidth: 0,
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
                borderBottomWidth: 1,
              }}
              codeInputHighlightStyle={{borderColor: colors.primary}}
              onCodeFilled={(code) => codPayment(code)}
            />
          </View>
        </View>
      </Modalize>
      {selected.length > 0 && (
        <FAB
          onPress={() => codApproval(selectedTotal, selectedChange)}
          visible={showFab}
          label={`RP ${currencyFormat(selectedTotal)}`}
          icon="check"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </>
  );
};

export default memo(TransactionAssignList);
