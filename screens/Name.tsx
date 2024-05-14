import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import app_colors from '../constants/app_colors';
import Icon from 'react-native-vector-icons/Ionicons';

const Name = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  return (
    <>
      <ImageBackground
        resizeMode="cover"
        source={require('../assets/onboardImage.jpg')}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <View
          style={{
            backgroundColor: 'white',
            //   flex: 1,
            justifyContent: 'center',
            rowGap: 24,
            paddingHorizontal: 16,
            paddingVertical: 32,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          <Image
            height={48}
            width={48}
            style={{ height: 48, width: 48, alignSelf: 'center' }}
            resizeMode="contain"
            source={require('../assets/logo.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              color: app_colors.primary,
              fontWeight: '700',
              fontSize: 28,
            }}
          >
            Healthy Harvest
          </Text>
          <View
            style={{
              padding: 8,
              paddingHorizontal: 18,
              paddingRight: 12,
              borderColor: '#5DDDAA',
              borderWidth: 4,
              borderRadius: 32,
              flexDirection: 'row',
              backgroundColor: '#F6F6F6',
              alignItems: 'center',
            }}
          >
            <TextInput
              value={name}
              placeholderTextColor={'grey'}
              onChangeText={setName}
              style={{ flexGrow: 1, fontSize: 18, color: 'black' }}
              placeholder="Type your name"
            />
            <TouchableOpacity
              onPress={() => {
                login(name);
                navigation.replace('Home');
              }}
              style={{
                backgroundColor: app_colors.primary,
                padding: 8,
                borderRadius: 400,
              }}
            >
              <Icon name="arrow-forward-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Name;
