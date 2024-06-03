import { View, Text, ScrollView, StatusBar, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import app_colors from '../constants/app_colors';
import Hero from '../component/HomeComponents/Hero';
import Weather from '../component/HomeComponents/Weather';
import TakeAPicture from '../component/HomeComponents/TakeAPicture';
import KnowledgeBaseSection from '../component/HomeComponents/KnowledgeBaseSection';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const HomeScreen = () => {
  const [location, setLocation] = useState<any>(false);
  const [weather, setWeather] = useState<any>();

  useEffect(() => {
    (() => {
      const result = requestLocationPermission();
      result.then((res) => {
        console.log('res is:', res);
        if (res) {
          Geolocation.getCurrentPosition(
            (position: any) => {
              console.log(position);
              setLocation(position?.coords);
            },
            (error) => {
              console.log(error.code, error.message);
              setLocation(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      });
      console.log(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        console.log(location);
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=98ce44eb72e5be41c287f4f92f048841`
        );
        console.log('Data', res.data);
        setWeather(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, [location]);

  console.log(weather);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24, rowGap: 24 }}>
        <Hero weather={weather} />
        <Weather weather={weather} />
        <TakeAPicture />
        <KnowledgeBaseSection />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
