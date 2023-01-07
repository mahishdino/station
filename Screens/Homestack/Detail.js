import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  RFValue as rs,
  RFPercentage as rp,
} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';


let TrainLocalTimerData = null

const Detail = ({ navigation, route }) => {
  const [StationTimer, setStationTimer] = useState(null);
  const [StationData, setStationData] = useState(null);
  const [timerSeconds, settimerSeconds] = useState(0);

  const GetTimer = async () => {
    try {

      let localStoredTimer = await AsyncStorage.getItem('@LOCAL_TIMER');

      let Train_id = ""
      if (route.params && route.params.data && route.params.data.train_Number) {
        setStationData(route.params.data)
        Train_id = route.params.data.train_Number
      } else {
        navigation.goBack()
      }

      if (localStoredTimer) {
        let parsedLocalStoredTimer = JSON.parse(localStoredTimer)
        console.log(parsedLocalStoredTimer, "parsedLocalStoredTimer")
        if (parsedLocalStoredTimer[Train_id]) {
          setStationTimer(parsedLocalStoredTimer[Train_id])
          TrainLocalTimerData = parsedLocalStoredTimer[Train_id]
        }
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    GetTimer()
    const interval = setInterval(() => {
      if (TrainLocalTimerData && TrainLocalTimerData.time) {
        let seconds = new Date().getTime() - TrainLocalTimerData.time
        seconds = Math.round(seconds / 1000)
        settimerSeconds((prev) => { return seconds })
      }
    }, 1000);
    return () => {
      TrainLocalTimerData = null
      clearInterval(interval)
    };

  }, [])

  const Store = async (timerdata, train_id, stationTimerdata) => {
    try {
      timerdata[train_id] = stationTimerdata
      const jsonValue = JSON.stringify(timerdata)
      console.log(jsonValue, "jsonValue")
      await AsyncStorage.setItem('@LOCAL_TIMER', jsonValue)
    } catch (error) {
      console.log(error, "err at Store")
    }
  }

  const StoreStationTimer = async (id, data) => {
    try {

      let localStoredTimer = await AsyncStorage.getItem('@LOCAL_TIMER');
      setStationTimer(data)
      if (localStoredTimer) {
        let parsedLocalStoredTimer = JSON.parse(localStoredTimer)
        Store(parsedLocalStoredTimer, id, data)

      } else {
        //first timer
        Store({}, id, data)
      }

    } catch (error) {
      console.log(error, "err atStoreStationTimer")
    }
  }

  const startStopTimer = () => {
    if (StationTimer && StationTimer.time) {
      //stop timer
      let stationTimerData = {
        time: null,
      }
      StoreStationTimer(StationData.train_Number, stationTimerData)
      TrainLocalTimerData = null
    } else {
      //start timer
      let stationTimerData = {
        time: new Date().getTime(),
      }
      TrainLocalTimerData = stationTimerData
      StoreStationTimer(StationData.train_Number, stationTimerData)
    }
  }

  if (StationData == null) {
    return (<View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="red" />
      </View>
    </View>)
  }

  return (
    <>

      <View style={styles.main}>
        <TouchableOpacity style={{ zIndex: 10 }} onPress={() => { navigation.goBack() }}>
          <Image resizeMode='contain' source={require('../Assets/back.png')} style={{ position: 'absolute', left: rs(20), top: rs(30), width: rs(20), height: rs(20), }} />
        </TouchableOpacity>
        <Image source={require('../Assets/Loginbg.png')}
          resizeMode={'cover'} style={{ width: '100%', height: '30%', position: 'absolute', top: -rs(20) }} />
        <View style={styles.mainSub}>


          <Text style={{ fontFamily: 'Poppins', fontSize: rs(20), color: '#000', fontWeight: '900', marginTop: rs(54) }}>Details</Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: rs(20), color: '#000', fontWeight: '900', marginTop: rs(5) }}>{route?.params?.data?.train_Number}</Text>

        </View>

        <View style={{ padding: rs(5), marginHorizontal: rs(20), marginTop: rs(100) }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: rs(20), color: '#000' }}>{StationTimer && StationTimer.time ? "Station Subscribed" : "Subscribe Station"}</Text>
        </View>

        <View style={{ borderRadius: 20, paddingVertical: rs(12), paddingHorizontal: rs(15), elevation: 2, backgroundColor: "white", marginHorizontal: rs(25) }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: rs(14), color: '#000' }}>
            Active From
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: rs(30), color: '#000' }}>{timerSeconds}</Text>
              <View style={{ paddingLeft: rs(5), marginTop: rs(5) }}>
                <Text style={{ fontSize: rs(11), fontFamily: 'Poppins-Bold', color: '#000', marginTop: rs(3), }}>Seconds</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => {
              startStopTimer()
            }} style={{ backgroundColor: 'red', paddingHorizontal: rs(30), height: rs(34), alignItems: 'flex-end', justifyContent: 'center', borderRadius: rs(15) }}>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: rs(12), color: '#fff' }}>{StationTimer && StationTimer.time ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Poppins-Bold', color: '#000', fontSize: rs(14) }}>More Info</Text>
            <TouchableOpacity>
              <Image source={require('../Assets/Btn.png')} style={{ width: rs(20), height: rs(20), marginLeft: rs(10) }} />
            </TouchableOpacity>
          </View>
        </View>





      </View>
    </>
  )
}

export default Detail

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