import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../../../screens/Auth';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default AuthStack;
