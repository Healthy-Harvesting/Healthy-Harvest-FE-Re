import { View, Text, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import app_colors from '../constants/app_colors';
import Hero from '../component/HomeComponents/Hero';
import Weather from '../component/HomeComponents/Weather';
import TakeAPicture from '../component/HomeComponents/TakeAPicture';
import KnowledgeBaseSection from '../component/HomeComponents/KnowledgeBaseSection';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24, rowGap: 24 }}>
        <Hero />
        <Weather />
        <TakeAPicture />
        <KnowledgeBaseSection />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
