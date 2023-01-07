/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  View,

} from 'react-native';
import Homestack from './Screens/Homestack/Homestack';
import Loginstack from './Screens/LoginStack/LoginStack';
import { StationContext, StationProvider } from './Screens/Context/StationContext';


const LoginCheck = () => {
  const { token, IsAuthLoaded } = useContext(StationContext)
  if (!IsAuthLoaded) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color="#0c7171"
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }

  if (token) {
    return <Homestack />

  } else {
    return <Loginstack />
  }

}


const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StationProvider>
        <NavigationContainer>
          <LoginCheck />
        </NavigationContainer>
      </StationProvider>
    </SafeAreaView>
  );
};



export default App;


