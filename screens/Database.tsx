import { View, Text, TouchableOpacity, FlatList } from 'react-native';
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
          paddingBottom: 240,
        }}
        style={{ width: '100%' }}
        data={Data}
        renderItem={({ item, index }: any) => {
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
              style={{ width: '48%', height: 220, borderWidth: 2, borderRadius: 12 }}
            >
              <Text style={{ color: 'black' }}>{item.Name}</Text>
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
