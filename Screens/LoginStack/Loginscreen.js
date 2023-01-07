import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import {
  RFValue as rs,
  RFPercentage as rp,
} from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast'
import { AUTH } from '../Services'
import { StationContext } from '../Context/StationContext';


const Loginscreen = ({ navigation }) => {
  const { setUserDetails, IsAuthLoaded } = React.useContext(StationContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)



  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


  const loginProcess = async () => {

    let em = validateEmail(email)
    console.log(em, 'em')



    if (em === true) {

      try {
        setLoading(true)
        let response = await AUTH("post", "api/login", {
          "email": email,
          "password": password
        });

        console.log(response, 'res');
        if (response.token) {
          setUserDetails(response.token)
        }

        if (response?.status == 400) {
          Toast.show(response.data.error, Toast.LONG);
        }
        setLoading(false)
        console.log(response, 'response')

      } catch (err) {
        setLoading(false)
        console.log("login:err", err);
      }

    } else {
      Toast.show("Not a valid email", Toast.LONG);

    }
  }



  return (
    <View style={styles.main}>

      <View style={styles.mainSub}>

        <Image source={require('../Assets/logo.png')} resizeMode={'contain'} style={{ width: rs(80), height: rs(80), marginTop: 20 }} />
        <Text style={{ fontFamily: 'Poppins', fontSize: rs(20), color: '#000', fontWeight: '900', marginTop: rs(44) }}>Login</Text>

      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: rs(46), marginLeft: rs(60) }}>
        <Image source={require('../Assets/attherate.png')}
          resizeMode={'contain'} style={{ width: rs(16), height: rs(16), marginTop: -rs(5) }} />
        <TextInput
          placeholder='Email'
          placeholderTextColor={'grey'}
          onChange={(txt) => {
            setEmail(txt.nativeEvent.text)
            console.log(txt.nativeEvent.text)


          }}
          style={{ width: rs(200), marginLeft: rs(20), fontFamily: 'Poppins-Bold', fontSize: rs(16), height: rs(50), color: '#000' }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: rs(60) }}>
        <Image source={require('../Assets/lock.png')}
          resizeMode={'contain'} style={{ width: rs(16), height: rs(16), marginTop: -rs(5) }} />
        <TextInput
          placeholder='Password'
          placeholderTextColor={'grey'}
          onChange={(txt) => { setPassword(txt.nativeEvent.text) }}
          secureTextEntry={true} style={{ width: rs(200), marginLeft: rs(20), fontFamily: 'Poppins-Bold', fontSize: rs(16), height: rs(50), color: '#000' }} />
      </View>

      <TouchableOpacity
        onPress={() => {
          loginProcess()
          console.log(email, 'email')
        }}
        style={{ alignSelf: 'center', width: rs(120), height: rs(50), backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', marginTop: rs(15), borderRadius: rs(25), justifyContent: 'center' }}>
        {loading ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={{ fontSize: rs(15), fontFamily: 'Poppins-Bold', color: '#fff', }}>
          Login
        </Text>}

        <Image source={require('../Assets/arrow.png')}
          resizeMode={'contain'} style={{ width: rs(16), height: rs(16), marginLeft: rs(5) }} />
      </TouchableOpacity>

      <Text onPress={() => { }} style={{ fontFamily: 'Poppins-Bold', fontSize: rs(12), color: '#000', alignSelf: 'center', marginTop: rs(20) }}>Forget Password?</Text>
      <Image source={require('../Assets/Loginbg.png')}
        resizeMode={'cover'} style={{ width: '100%', alignSelf: 'center', height: '30%' }} />
    </View>
  )
}

export default Loginscreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  mainSub: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})