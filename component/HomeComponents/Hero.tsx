import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import app_colors from '../../constants/app_colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { kelvinToCelsius, kelvinToFahrenheit } from '../../utils/tempConverter';

const Hero = ({ weather }: { weather: any }) => {
  const { userName } = useContext(AuthContext);
  const name = userName;
  const temp = '32';
  const day = 'Thu';
  const time = '10:46';
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.hero_contianer, { paddingTop: top }]}>
      <ImageBackground
        source={require('../../assets/scene-plants.png')}
        resizeMode="contain"
        imageStyle={{
          opacity: 0.5,
        }}
        style={{ paddingTop: 32 }}
      >
        <View style={styles.hero}>
          <View style={styles.hero__header}>
            <View>
              <Text style={styles.welcome}>WELCOME</Text>
              <Text style={styles.name}>{name}</Text>
            </View>

            <Feather name="bell" size={24} color="white" />
          </View>
          <View style={{ flexDirection: 'row', columnGap: 12 }}>
            <Text style={styles.temp}> {kelvinToFahrenheit(weather.main.temp.toFixed(0))}°F</Text>
            <Text style={[styles?.temp, styles.text]}>
              {day}, {time}
              {'\n'}/ {kelvinToCelsius(weather.main.temp.toFixed(0))}° C
            </Text>
          </View>
          <Text style={[styles.temp, styles.text]}>{weather.name}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  hero_contianer: {
    backgroundColor: app_colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  hero: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  hero__header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  welcome: {
    color: 'white',
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: '700',
  },
  name: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    includeFontPadding: false,
  },
  temp: {
    fontSize: 56,
    includeFontPadding: false,
    fontWeight: '700',
    color: '#fff',
    flexDirection: 'row',
    columnGap: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
});
