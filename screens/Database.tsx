import { View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import React from 'react';
import Data from '../assets/Data.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import app_colors from '../constants/app_colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Database = () => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  return (
    <View>
      <View
        style={{
          paddingTop: top + 12,
          paddingHorizontal: 24,
          backgroundColor: app_colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 24,
          paddingBottom: 24,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            padding: 8,
            borderRadius: 400,
          }}
        >
          <Icon name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Plant Diseases</Text>
      </View>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          columnGap: 12,
        }}
        contentContainerStyle={{
          padding: 24,
          display: 'flex',
          rowGap: 12,
          justifyContent: 'space-between',
          paddingBottom: 140,
        }}
        style={{ width: '100%' }}
        data={Data}
        renderItem={({ item, index }: any) => {
          if (item.Name == 'Not A crop !!') return <></>;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Diagnosis', {
                  uri: item?.Pics[0],
                  image: item?.Pics[0],
                  data: item?.Name,
                })
              }
              key={index}
              style={{
                width: '48%',
                height: 220,
                borderRadius: 12,
                elevation: 1,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <ImageBackground
                style={{ flex: 1, overflow: 'hidden' }}
                source={{ uri: item?.Pics[0] }}
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
                <Text numberOfLines={1} style={{ fontSize: 14, color: '#fff', fontWeight: '700' }}>
                  {item?.Name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <ScrollView style={{ paddingHorizontal: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingVertical: 24,
            columnGap: 8,
            rowGap: 8,
            justifyContent: 'center',
          }}
        >
          {Data.map((item, index) => {
            return ;
          })}
        </View>
      </ScrollView> */}
    </View>
  );
};

export default Database;
