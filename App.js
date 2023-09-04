import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import RootStack from './src/configs/navigation';
import {store} from './src/configs/redux';
import {colors} from './src/constants/colors';
import * as RootNavigation from './src/utils/RootNavigation';

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
    },
  };
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
