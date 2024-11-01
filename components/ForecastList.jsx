import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'

const ForecaseList = ({forecast}) => {
  return (
    <FlatList
        data={forecast}
        keyExtractor={(item)=> item.date}
        contentContainerStyle={{marginTop: 16}}
        renderItem={({item})=> (
          <View key={item?.date} style={{padding: 8, borderRadius: 8, width: Dimensions.get('screen').width/1.15, backgroundColor: 'whitesmoke', marginTop: 8}}>
            <Text style={{color: '#f05', fontSize: 12, fontWeight: '500'}}> {item?.date} </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
              <View>
                <Text style={{color: 'black', fontSize: 14}}> Avg. Temp. </Text>
                <Text style={{color: 'navy', fontSize: 20}}> {item?.day?.avgtemp_c} </Text>
              </View>
              <View>
                <Text style={{color: 'black', fontSize: 16}}> Conditions </Text>
                <Text style={{color: 'navy', fontSize: 16}}> {item?.day?.condition?.text} </Text>
              </View>
              <View>
                <Text style={{color: 'black', fontSize: 14}}> Wind Speed </Text>
                <Text style={{color: 'navy', fontSize: 20}}> {item?.day?.maxwind_kph} </Text>
              </View>
            </View>
          </View>
        )}
    />
  )
}

export default ForecaseList

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
})