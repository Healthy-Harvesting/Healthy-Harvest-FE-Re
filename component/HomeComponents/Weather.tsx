import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';

const WeatherInfo = ({
  icon,
  size,
  color,
  label,
  value,
}: {
  icon: any;
  color: string;
  size: number;
  label: string;
  value: string;
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        width: '33.33%',
        justifyContent: 'center',
      }}
    >
      <Feather name={icon} size={size} color={color} />
      <Text style={{ fontSize: 14, fontWeight: '700', color: 'black' }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>{value}</Text>
    </View>
  );
};

const Vr = () => {
  return <View style={{ height: '100%', backgroundColor: '#D0D0D0', width: 1 }} />;
};

const Weather = ({ weather }: { weather: any }) => {
  return (
    <View style={styles.container}>
      <WeatherInfo icon="sun" size={32} color="orange" label="UV Index" value="LOW" />
      <Vr />
      <WeatherInfo icon="droplet" size={32} color="#5193DE" label="Humidity" value="83%" />
      <Vr />
      <WeatherInfo icon="wind" size={32} color="#7E83A9" label="Wind" value="10 km/h" />
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    backgroundColor: '#fff',
    marginTop: -48,
    elevation: 3,
    borderRadius: 24,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
