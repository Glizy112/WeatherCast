import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useSate } from 'react'

const WeatherCard = ({ currentWeather }) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
                <Text style={{color: 'navy', fontSize: 16}}> Conditions </Text>
                <Text style={{color: 'navy', fontSize: 24, fontWeight: 'medium'}}> {currentWeather?.current?.condition?.text} </Text>
            </View>
            <Text 
                style={{color: currentWeather?.current?.temp_c<=24 ? 'green' : 'navy', fontSize: 24, fontWeight: 'bold'}}
            > {currentWeather?.current?.temp_c}°C </Text>
        </View>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
            <View style={{flexDirection: 'column'}}>
                <Text style={{color: 'navy', fontSize: 16}}> Current Temperature </Text>
                
            </View>
        </View> */}
        <View style={{flexDirection: 'column', marginTop: 8}}>
            <Text style={{color: 'navy', fontSize: 16}}> Last Updated </Text>
            <Text style={{color: 'navy', fontSize: 16}}> 
                {' '}{currentWeather?.current?.last_updated?.split(' ')[0]} {' '}
                {currentWeather?.current?.last_updated?.split(' ')[1]} 
            </Text>
        </View>
        <View style={{flexDirection: 'column', marginTop: 8}}>
            <Text style={{color: 'navy', fontSize: 16}}> Wind Speed </Text>
            <Text style={{color: 'navy', fontSize: 16}}> {currentWeather?.current?.wind_kph} (in km per hour) </Text>
        </View>
    </View>
  )
}

export default WeatherCard

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width/1.15,
        backgroundColor: 'whitesmoke',
        borderRadius: 12,
        //justifyContent: 'flex-start',
        //alignItems: 'flex-start',
        padding: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    }
})