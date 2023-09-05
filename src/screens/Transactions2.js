import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view-improved';
import TransactionPickedList from '../organism/transactions2/TransactionPickedList';

const Transactions2 = ({route}) => {
  const {init} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({headerTitle: route.params.title});
  }, [navigation, route]);

  return (
    <ScrollableTabView
      initialPage={init || 0}
      renderTabBar={() => (
        <ScrollableTabBar
          backgroundColor="rgba(255, 255, 255, 0.7)"
          activeTextColor="#1100BB"
        />
      )}>
      <TransactionPickedList
        tabLabel="Belum Dikirim"
        status="0"
        option={route.params.title.toLowerCase()}
      />
      <TransactionPickedList
        tabLabel="Sudah Dikirim"
        status="3"
        option={route.params.title.toLowerCase()}
      />
    </ScrollableTabView>
  );
};

export default memo(Transactions2);
