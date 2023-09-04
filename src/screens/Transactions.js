import React, {memo} from 'react';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import TransactionAssignList from '../organism/transactions/TransactionAssignList';
import TransactionPickedList from '../organism/transactions/TransactionPickedList';

const Transactions = ({route}) => {
  const {init} = route.params;

  return (
    <ScrollableTabView
      initialPage={init || 0}
      renderTabBar={() => (
        <ScrollableTabBar
          backgroundColor="rgba(255, 255, 255, 0.7)"
          activeTextColor="#1100BB"
        />
      )}>
      <TransactionAssignList tabLabel="Ditugaskan" />
      <TransactionPickedList tabLabel="Dipickup" status="0" option={null} />
      <TransactionPickedList tabLabel="Diantarkan" status="2" option={null} />
    </ScrollableTabView>
  );
};

export default memo(Transactions);
