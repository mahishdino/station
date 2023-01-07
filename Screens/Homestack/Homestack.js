import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Selectstation from './Selectstation'
import Detail from './Detail'
import Disclaimer from '../LoginStack/Disclaimer'

const Homes = createStackNavigator()

const Homestack = () => {
  return (
    <Homes.Navigator initialRouteName='disclaimer' screenOptions={{ headerShown: false }}>
      <Homes.Screen name='disclaimer' component={Disclaimer} />
      <Homes.Screen name='selectStation' component={Selectstation} />
      <Homes.Screen name='detail' component={Detail} />
    </Homes.Navigator>

  )
}

export default Homestack