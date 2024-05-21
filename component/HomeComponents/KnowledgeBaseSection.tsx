import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import app_colors from '../../constants/app_colors';
import { useNavigation } from '@react-navigation/native';

const KnowledgeBaseSection = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ paddingHorizontal: 24, rowGap: 12 }}>
      <Text
        style={{
          color: app_colors.secondary,
          fontSize: 18,
          fontWeight: '700',
        }}
      >
        Plant Database
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Database')}
        style={{
          borderRadius: 24,
          overflow: 'hidden',
          elevation: 2,
          backgroundColor: app_colors.secondary,
        }}
      >
        <ImageBackground
          source={require('../../assets/images/field-of-tobacco.jpg.webp')}
          style={{
            height: 170,
            borderRadius: 25,
            flex: 1,
            overflow: 'hidden',
            elevation: 2,
            opacity: 0.9,
          }}
        />
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#17B978CC',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 10,
            paddingHorizontal: 24,
          }}
        >
          <Text style={{ fontSize: 16, color: '#fff', fontWeight: '700' }}>Plant Diseases</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default KnowledgeBaseSection;
