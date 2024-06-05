import { Alert, Image, ScrollView, Text, View } from 'react-native';

import React, { useEffect, useState } from 'react';
import app_colors from '../constants/app_colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Data from '../assets/Data.json';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import Accordion from '../component/common/Accordian';
import ImageGrid from '../component/common/ImageGrid';

const DiagnosisScreen = ({ route }: any) => {
  const { data, image, uri } = route?.params;
  console.log(image);
  const [dia, setDia] = useState<any>({});
  console.log(data);
  function findDiseaseByName(disease_name: string) {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].Name === disease_name) {
        return Data[i];
      }
    }
    return null; // Return null if no disease is found with the given name
  }

  const getData = async () => {
    try {
      // const res = await axios.get(`https://b6ae-34-73-244-5.ngrok-free.app/disease-info/${data}`);
      //   function findDiseaseByName(data_final, disease_name) {
      // for (let i = 0; i < data_final.length; i++) {
      //     if (data_final[i].Name === disease_name) {
      //         return data_final[i];
      //     }
      // }
      //     return null; // Return null if no disease is found with the given name
      // }

      // console.log(res);
      setDia(findDiseaseByName(data));
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (data == 'Not A crop !!' || !data) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        <LottieView
          style={{ height: 200, width: 300 }}
          autoPlay
          loop={false}
          source={require('../assets/404.json')}
        />
        <Text
          textBreakStrategy="balanced"
          style={{
            textAlign: 'center',
            color: app_colors?.primary,
            fontSize: 24,
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          Probably not a Plant or Crop !!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: app_colors?.primary,
            fontSize: 14,
            fontWeight: '500',
          }}
        >
          Sorry we could not get a proper diagnosis for the image. Please click a clearer picture if
          possible..
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        {/* <StatusBar translucent backgroundColor="#17B978" /> */}
        <View
          style={{
            backgroundColor: '#17B978',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Image source={{ uri: uri ? uri : 'file://' + image }} style={{ height: 200 }} />
          <View style={{ padding: 25 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
              }}
            >
              Fruit : {dia?.FruitName}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                marginBottom: 10,
                fontWeight: 'bold',
              }}
            >
              {data}({dia?.Type})
            </Text>

            <Text style={{ color: 'white', fontSize: 16 }}>{dia?.Description}</Text>
          </View>
        </View>

        <View style={{ margin: 24, rowGap: 12 }}>
          {dia?.Cure?.length > 0 && (
            <Accordion
              title={'Treatment'}
              content={<Text style={{ color: '#000', fontSize: 16 }}>{dia?.Cure}</Text>}
            />
          )}
          {dia?.Medications?.length > 0 && (
            <Accordion
              title={'Medication'}
              content={
                <>
                  {dia?.Medications?.map((item: any, index: number) => {
                    return (
                      <Text key={index} style={{ color: '#000', fontSize: 16 }}>
                        - {item}
                      </Text>
                    );
                  })}
                </>
              }
            />
          )}

          <Accordion
            title={'Maintainance'}
            content={
              <View style={{ rowGap: 12 }}>
                {dia?.Maintaining?.map((item: any, index: number) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        columnGap: 12,
                        alignItems: 'center',
                      }}
                      key={index}
                    >
                      <MaterialCommunityIcons
                        name="brightness-1"
                        size={8}
                        color={app_colors?.secondary}
                      />
                      <Text key={index} style={{ color: '#000', fontSize: 16 }}>
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            }
          />
          <ImageGrid images={dia?.Pics} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DiagnosisScreen;
