import {
  Alert,
  Button,
  Dimensions,
  Image,
  Modal,
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
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const TakeAPicture = () => {
  const colorScheme = useColorScheme();
  var { width } = Dimensions.get('window');
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const predictImage = async () => {
    try {
      setLoading(true);
      const imageData = new FormData();
      const result = await fetch(image?.uri);
      const data: any = await result.blob();
      // const result = await fetch(`file://${photo.path}`);
      // const data: any = await result.blob();
      imageData.append('file', {
        name: data._data.name,
        uri: image?.uri,
        type: 'image/jpg',
        fileName: data._data.name || 'fallback.jpg',
      });
      imageData.append('t', 'mobilenetV2');

      const res = await axios.post('http://3.6.254.5/api/predict', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        // router.replace({
        //   pathname: '/(tabs)/Home/Diagnosis',
        //   params: {
        //     image: photo?.path,
        //     data: res?.data?.Name,
        //   },
        // });
        console.log(res.data.Name);
        setTimeout(() => {
          navigation.navigate('Diagnosis', { image: image?.uri, data: res?.data?.Name });
          setLoading(false);
        }, 2000);
      }
    } catch (error: any) {
      Alert.alert('Error in fetching data', error?.toString());
      console.log(error.response.data);
      setImage(null);
      setLoading(false);
    } finally {
    }
  };

  useEffect(() => {
    image && predictImage();
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
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
        {/* <FontAwesome6 name="clock-rotate-left" size={22} color={app_colors.primary} /> */}
      </View>

      <Image
        resizeMode="contain"
        source={require('../../assets/picture-description.png')}
        style={{ height: 150 }} // Adjusted height to 30%
      />
      <View style={{ flexDirection: 'row', columnGap: 6 }}>
        <TouchableOpacity
          onPress={openCamera}
          style={{
            backgroundColor: app_colors.primary,
            marginTop: 6,
            paddingHorizontal: 24,
            paddingVertical: 12,
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
            borderRadius: 80,
            columnGap: 24,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Camera</Text>
          <Feather name="camera" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: app_colors.primary,
            marginTop: 6,
            paddingHorizontal: 24,
            paddingVertical: 12,
            flexDirection: 'row',
            flex: 1,

            justifyContent: 'center',
            borderRadius: 80,
            columnGap: 24,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Gallery</Text>
          <Feather name="image" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={loading}
        statusBarTranslucent
        presentationStyle="fullScreen"
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingHorizontal: 24,
            borderStartColor: app_colors.secondary,
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <LottieView
            style={{ height: 300, width: 300 }}
            autoPlay
            loop
            source={require('../../assets/leaf_loader2.json')}
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
            Analyzing your image....
          </Text>
        </View>
      </Modal>
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
