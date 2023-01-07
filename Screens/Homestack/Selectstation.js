import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  RFValue as rs,
  RFPercentage as rp,
} from 'react-native-responsive-fontsize';
import { StationContext } from '../Context/StationContext';


const Data = [

  {
    id: 1,
    train_Name: 'Island bp',
    train_Number: '23884433',

  },
  {
    id: 2,
    train_Name: 'Island bp',
    train_Number: '23884436'
  },
  {
    id: 3,
    train_Name: 'Island bp',
    train_Number: '33884433'
  },
  {
    id: 4,
    train_Name: 'Island bp',
    train_Number: '53884433'
  },

  {
    id: 6,
    train_Name: 'Island bp',
    train_Number: '74884433'
  }
]

const Selectstation = ({ navigation }) => {

  const { Logout } = React.useContext(StationContext)

  const [data, setData] = React.useState(Data)
  const [searchData, setSearchData] = React.useState(Data)

  const Search = text => {
    let _Text = text.toLowerCase();
    if (text == '') {
      setData(searchData);
    } else {
      let FilteredList = searchData.filter(item => {
        let str = '';
        if (
          item.train_Name.toLowerCase().includes(_Text) ||
          item.train_Number.toLowerCase().includes(_Text)
        ) {
          return true;
        } else {
          return false;
        }
      });
      setData(FilteredList);
    }
  };


  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => { navigation.navigate('detail', { data: item }) }}
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: rs(30) }}>
        <Image source={require('../Assets/petrol.png')} resizeMode={'contain'} style={{ width: rs(40), height: rs(40) }} />

        <View style={{ marginLeft: rs(10) }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: rs(14), color: '#000' }}>
            {item.train_Number}
          </Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: rs(12), color: '#ADB7C6' }}>
            {item.train_Name}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
  return (
    <>

      <View style={styles.main}>
        <Image source={require('../Assets/Loginbg.png')}
          resizeMode={'cover'} style={{ width: '100%', height: '30%', position: 'absolute', top: -rs(20) }} />
        <View style={styles.mainSub}>


          <Text style={{ fontFamily: 'Poppins', fontSize: rs(20), color: '#000', fontWeight: '900', marginTop: rs(54) }}>Select station</Text>

        </View>

        <View style={{ width: '80%', backgroundColor: '#F0F4F5', marginTop: rs(100), height: 50, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: rs(10) }}>
          <Image source={require('../Assets/Search.png')}
            resizeMode={'contain'} style={{ width: rs(16), height: rs(16), marginLeft: rs(10) }} />
          <TextInput onChangeText={(txt) => Search(txt)} placeholder='Search by ID, Name, City' style={{ width: rs(200), fontFamily: 'Poppins', fontSize: rs(14), height: rs(50), marginLeft: rs(10) }} />
        </View>


        <View style={{ width: '80%', alignSelf: 'center' }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>



        <TouchableOpacity onPress={() => { Logout() }} style={{ alignSelf: 'center', backgroundColor: 'red', padding: rs(10), borderRadius: 10, position: 'absolute', bottom: 10 }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: rs(15), color: '#fff' }}>Logout</Text>
        </TouchableOpacity>


      </View>
    </>
  )
}

export default Selectstation

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