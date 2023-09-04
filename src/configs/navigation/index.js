import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isLogin} from '../../utils/auth';
import {setAuth} from '../redux/action/authActions';
import AppStack from './app';
import AuthStack from './auth';
import Splash from '../../screens/Splash';

const Stack = createStackNavigator();

const RootStack = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    isLogin().then((e) => {
      e && dispatch(setAuth(true));
    });
    setTimeout(() => setLoading(false), 600);
  }, [dispatch]);

  return (
    <Stack.Navigator headerMode="none">
      {loading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : auth.isLogin ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
