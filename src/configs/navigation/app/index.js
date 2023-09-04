import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../../../screens/Dashboard';
import Scan from '../../../screens/Scan';
import Snap from '../../../screens/Snap';
import User from '../../../screens/User';
import Cod from '../../../screens/Cod';
import Transactions from '../../../screens/Transactions';
import TransactionView from '../../../screens/TransactionView';
import Transactions2 from '../../../screens/Transactions2';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{headerTitle: 'Scan Resi'}}
      />
      <Stack.Screen
        name="Snap"
        component={Snap}
        options={{headerTitle: 'Bukti Pengiriman'}}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{headerTitle: 'Data Kurir'}}
      />
      <Stack.Screen
        name="Cod"
        component={Cod}
        options={{headerTitle: 'Tagihan COD'}}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerStyle: {
            elevation: 0,
          },
          headerTitle: 'Paket Anda',
        }}
      />
      <Stack.Screen
        name="Transactions2"
        component={Transactions2}
        options={{
          headerStyle: {
            elevation: 0,
          },
          headerTitle: 'Pesanan Lainnya',
        }}
      />
      <Stack.Screen
        name="TransactionView"
        component={TransactionView}
        options={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
          },
          headerTitle: 'Detail Paket',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
