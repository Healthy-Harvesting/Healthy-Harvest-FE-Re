import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import app_colors from '../../constants/app_colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { kelvinToCelsius, kelvinToFahrenheit } from '../../utils/tempConverter';

const Hero = ({ weather, loading }: { weather: any; loading: boolean }) => {
  const { userName } = useContext(AuthContext);
  const name = userName;
  const temp = '32';
  const currentDate = new Date();

  // Get the current day of the week as a string
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = daysOfWeek[currentDate.getDay()];

  // Get the current hours and minutes
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format the minutes to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Combine the day and time into the desired format
  const formattedDateTime = `${day}, ${hours}:${formattedMinutes} ${ampm}`;

  // console.log(formattedDateTime);

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

            {/* <Feather name="bell" size={24} color="white" /> */}
          </View>
          <View style={{ flexDirection: 'row', columnGap: 12 }}>
            <Text style={styles.temp}>
              {loading ? (
                '-'
              ) : (
                <>{weather && parseInt(kelvinToFahrenheit(weather?.main?.temp?.toFixed(1)))}°F</>
              )}
            </Text>
            <Text style={[styles?.temp, styles.text]}>
              {formattedDateTime}
              {'\n'}/{' '}
              {loading ? (
                '-'
              ) : (
                <>{weather && parseInt(kelvinToCelsius(weather?.main?.temp?.toFixed(1)))}° C</>
              )}
            </Text>
          </View>
          <Text style={[styles.temp, styles.text]}>{weather?.name}</Text>
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
