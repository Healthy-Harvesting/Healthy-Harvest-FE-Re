import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import app_colors from '../../constants/app_colors';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const TakeAPicture = () => {
  const colorScheme = useColorScheme();
  var { width } = Dimensions.get('window');
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: app_colors.secondary,
            fontSize: 18,
            fontWeight: '700',
          }}
        >
          Healthify your crops
        </Text>
        <FontAwesome6 name="clock-rotate-left" size={22} color={app_colors.primary} />
      </View>

      <Image
        resizeMode="contain"
        source={require('../../assets/picture-description.png')}
        style={{ height: 150 }} // Adjusted height to 30%
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
        style={{
          backgroundColor: app_colors.primary,
          marginTop: 6,
          width: '100%',
          paddingHorizontal: 24,
          paddingVertical: 12,
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 80,
          columnGap: 24,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>TAKE A PICTURE</Text>
        <Feather name="camera" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TakeAPicture;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    rowGap: 12,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
