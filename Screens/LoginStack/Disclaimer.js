import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  RFValue as rs,
  RFPercentage as rp,
} from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Disclaimer = ({ navigation }) => {

  const [visible, setVisible] = React.useState(false)
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@accept', value)
      navigation.replace('selectStation')

    } catch (e) {
      // saving error

      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@accept')
      if (value !== null) {
        navigation.replace('selectStation')
        setVisible(true)
        // value previously stored
      }else{
        setVisible(true)
      }
  
    } catch (e) {
      setVisible(true)
      // error reading value
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  if (!visible) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    )
  }


  return (
    <>

      <View style={styles.main}>
        <Image source={require('../Assets/Loginbg.png')}
          resizeMode={'cover'} style={{ width: '100%', height: '30%', position: 'absolute', top: -rs(20) }} />
        <View style={styles.mainSub}>


          <Image source={require('../Assets/logo.png')} resizeMode={'contain'} style={{ width: rs(80), height: rs(80), marginTop: rs(30) }} />
          <Text style={{ fontFamily: 'Poppins', fontSize: rs(20), color: '#000', fontWeight: '900', marginTop: rs(54) }}>Disclaimer</Text>

        </View>

        <Text

          style={{ fontFamily: 'Poppins', fontSize: rs(13), alignSelf: 'center', width: '80%', lineHeight: rs(22), marginTop: rs(20) }}>
          The information provided by the Zdaly Fuel
          Network Optimizer app is based on historical data. Data on Zdaly Light is updated once daily at 8:00 a.m. eastern time. Any prospective information is based on that data and should not be relied on as a estimation of future performance. Any future product prices are the manufacturer's suggested retail price (MSRP) only. Sites are independent operators free to set their retail
          price.
        </Text>




        <TouchableOpacity
          onPress={() => {
            storeData('yes')

          }}
          style={{ alignSelf: 'center', width: rs(200), height: rs(50), backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', marginTop: rs(30), borderRadius: rs(25), justifyContent: 'center' }}>
          <Text style={{ fontSize: rs(15), fontFamily: 'Poppins-Bold', color: '#fff', }}>
            I Accept
          </Text>

        </TouchableOpacity>



      </View>
    </>
  )
}

export default Disclaimer

const styles = StyleSheet.create({
  main: {
    flex: 1,

    backgroundColor: '#fff'
  },
  mainSub: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rs(30)
  }
})