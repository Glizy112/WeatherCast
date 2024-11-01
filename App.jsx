/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import GeoLocation from 'react-native-geolocation-service';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';

const base_url = 'http://api.weatherapi.com/v1/';
//const api_key = process.env?.WEATHER_KEY;

const requestLocPermit =async()=> {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Current Location Permission',
      message: 'Can you give access to your location?',
      buttonNeutral: 'Ask Me Later',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel',
    });
    console.log('current permission-> ', granted);
    if(granted==='granted'){
      console.log("Location Permission Granted");
      return true;
    }else{
      console.log("Location Not Permitted!");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

function App() {

  const [location, setLocation] = useState({latitude: 30.2172698, longitude: 74.9403276});
  const [currentWeather, setCurrentWeather] = useState(false);
  const [currentCity, setCurrentCity] = useState({cityName: '', state: ''});
  const [forecastData, setForecastData] = useState([]);

  const getWeatherInfo =async()=> {
    //const new_url = 'https://api.weatherapi.com/v1/current.json?key=5b465a792ff24bc29c172055240111&q=30.217273,74.9403328&aqi=no';
    const url = base_url
    + 'current'
    + `.json?key=5b465a792ff24bc29c172055240111&q=${location?.latitude},${location?.longitude}&aqi=no`;
    
    console.log(url);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        'Content-Type': 'application/json',
      });
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data);
      setCurrentWeather(data);
      setCurrentCity({cityName: data?.location?.name, state: data?.location?.region});
    } catch (error) {
      console.error(error.message);
    }
  }

  // const showPreviousWeather =()=> {
  //   const url = base_url
  //   + 'history'
  //   + `.json?key=5b465a792ff24bc29c172055240111&q=${location?.latitude},${location?.longitude}&dt=2024-11-1&aqi=no&alerts=no`;
  //   console.log("Previous Weather");
  // }

  const showNextWeather =async()=> {
    const url = base_url
    + 'forecast'
    + `.json?key=5b465a792ff24bc29c172055240111&q=${location?.latitude},${location?.longitude}&days=4&aqi=no&alerts=no`;

    //console.log(url);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        'Content-Type': 'application/json',
      });
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data?.forecast?.forecastday[0]?.date, data?.forecast?.forecastday?.length);
      const tempData = [];
      data?.forecast?.forecastday?.map(item=> {
        tempData.push({
          date: item?.date,
          day: item?.day,
        })
      })
      setForecastData(tempData);
    } catch (error) {
      console.error(error.message);
    }

    //console.log("Next Weather");
  }
  
  const getLocation =()=> {
    const locationPermitted = requestLocPermit();
    
    locationPermitted.then(res=> {
      console.log('Permission is: ', res);
      if(res) {
          GeoLocation.getCurrentPosition(position=> {
            console.log(position);
            setLocation({latitude: position?.coords?.latitude, longitude: position?.coords?.longitude});
          },
          error=> {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );  
      }
      //console.log(location);
    });
  }

  useEffect(()=>{
    getLocation();
  },[]);
  
  // const showCurrentWeather =()=> {
  //   setShow(true);
  //   getWeatherInfo();
  // }

  useEffect(()=> {
    return()=> getWeatherInfo();
  },[location]);

  return (
    <SafeAreaView style={styles.container}>
      <View 
        style={{
          width: '100%', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderColor: 'black',
          padding: 20
        }}
      >
        <Text style={styles.sectionTitle} onPress={()=> console.log(forecastData)}> 🌞Weather Cast </Text>
        {
          currentCity?.cityName==='' ? 
          (<ActivityIndicator color={'navy'} size={16}/>) :
          (<TouchableOpacity onPress={getLocation}>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 4}}> 
                📍{currentCity?.cityName}, {currentCity?.state} 
              </Text> 
          </TouchableOpacity>)
        } 
      </View>
      <View style={{margin: 32}}>
        <WeatherCard currentWeather={currentWeather} currentCity={currentCity}/>
      </View>
      {forecastData?.length > 0 && <View style={{marginLeft: 32, marginRight: 24}}>
        <Text style={{color: 'navy', fontSize: 20, fontWeight: '600'}}> 4-Day Forecast </Text> 
        <ForecastList forecast={forecastData}/>
      </View>
      }
      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 24}}>
        {/* <TouchableOpacity onPress={showPreviousWeather} style={{padding: 8, backgroundColor: 'whitesmoke'}}>
          <Text style={{color: 'red', fontSize: 16}}> Previous </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={showNextWeather} style={{padding: 8, backgroundColor: 'whitesmoke', borderRadius: 12}}>
          <Text style={{color: 'navy', fontSize: 16, paddingHorizontal: 32, paddingVertical: 8}}> Next Forecast </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{padding: 8, backgroundColor: 'whitesmoke', marginLeft: 8, alignSelf: 'center'}}>
          <Text style={{color: 'black', fontSize: 16}}> Show Weather </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'navy',
  },
});

export default App;
