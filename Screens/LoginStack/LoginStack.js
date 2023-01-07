import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Loginscreen from './Loginscreen'
import Disclaimer from './Disclaimer'


const Login = createStackNavigator()

const Loginstack = () => {
  return (
    <Login.Navigator initialRouteName='Loginscreen' screenOptions={{ headerShown: false }}>
      <Login.Screen name='Loginscreen' component={Loginscreen} />
      <Login.Screen name='disclaimer' component={Disclaimer} />
    </Login.Navigator>

  )
}

export default Loginstack