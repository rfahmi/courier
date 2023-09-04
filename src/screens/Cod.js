import React, {memo} from 'react';
import TransactionPickedList from '../organism/transactions/TransactionPickedList';

const Cod = () => {
  return <TransactionPickedList status="2" option="cod" />;
};

export default memo(Cod);
