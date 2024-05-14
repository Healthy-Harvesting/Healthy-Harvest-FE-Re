import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  PhotoFile,
  TakePhotoOptions,
} from 'react-native-vision-camera';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';
import app_colors from '../constants/app_colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const device = useCameraDevice('back', {
    physicalDevices: ['ultra-wide-angle-camera'],
  });

  const { hasPermission, requestPermission } = useCameraPermission();

  const [isActive, setIsActive] = useState(false);
  const [flash, setFlash] = useState<TakePhotoOptions['flash']>('off');

  const [photo, setPhoto] = useState<PhotoFile>();
  const [loading, setLoading] = useState(false);
  const camera = useRef<Camera>(null);

  const [mode, setMode] = useState('camera');
  const [diagnosisData, setDiagnosisData] = useState(null);
  const navigation = useNavigation<any>();
  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const onTakePicturePressed = async () => {
    const photo = await camera.current?.takePhoto({
      flash,
    });

    setPhoto(photo);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
    if (result) {
      const photo: any = result?.assets?.[0];
      try {
        setLoading(true);
        const imageData = new FormData();

        const result = await fetch(photo?.uri);
        const data: any = await result.blob();
        imageData.append('file', {
          name: data._data.name,
          uri: photo?.uri,
          type: 'image/jpg',
          fileName: data._data.name || 'fallback.jpg',
        });

        const res = await axios.post('http://localhost:9000/predict', imageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.status == 200) {
          setTimeout(() => {
            navigation.replace('Diagnosis', { image: photo?.uri, data: res?.data?.Name });
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        Alert.alert('Error in fetching data', error?.toString());
        console.log(error);
      } finally {
        // setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (photo) {
      setIsActive(false);
      uploadPhoto();
    } else {
      setIsActive(true);
    }
  }, [photo]);

  const uploadPhoto = async () => {
    if (!photo) {
      return;
    }
    try {
      setLoading(true);
      const imageData = new FormData();

      const newImageUri = 'file://' + photo.path.split('file:/').join('');
      const result = await fetch(`file://${photo.path}`);
      const data: any = await result.blob();
      imageData.append('file', {
        name: data._data.name,
        uri: newImageUri,
        type: 'image/jpg',
        fileName: data._data.name || 'fallback.jpg',
      });

      const res = await axios.post('http://localhost:9000/predict', imageData, {
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
        setTimeout(() => {
          navigation.replace('Diagnosis', { image: photo?.path, data: res?.data?.Name });
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      Alert.alert('Error in fetching data', error?.toString());
      console.log(error);
    } finally {
    }
  };

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>Camera device not found</Text>;
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}
      >
        <LottieView
          style={{ height: 300, width: 300 }}
          autoPlay
          loop
          source={require('../assets/leaf_loader2.json')}
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
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      {!photo && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          focusable
          isActive={isActive && mode === 'camera'}
          photo={true}
        />
      )}

      {/* {photo && (
        <>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: "file://" + photo.path }}
              he
            />
            <TouchableOpacity>
              <FontAwesome5
                onPress={() => setPhoto(undefined)}
                name="arrow-left"
                size={25}
                color="white"
                style={{ position: "absolute", top: 50, left: 30 }}
              />
            </TouchableOpacity>

            <View style={{}}>
              <Button title="Upload" onPress={uploadPhoto} />
            </View>
          </View>
        </>
      )} */}

      {!photo && (
        <>
          <View
            style={{
              position: 'absolute',
              right: 10,
              top: 50,
              padding: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
              gap: 30,
            }}
          >
            <Ionicons
              name={flash === 'off' ? 'flash-off' : 'flash'}
              onPress={() => setFlash((curValue) => (curValue === 'off' ? 'on' : 'off'))}
              size={30}
              color="white"
            />
          </View>
          <TouchableOpacity
            onPress={onTakePicturePressed}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 50,
              width: 75,
              height: 75,
              backgroundColor: 'white',
              borderRadius: 75,
            }}
          >
            <Ionicons name="camera" size={48} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 50,
              left: 50,
              width: 40,
              height: 40,
              borderRadius: 75,
            }}
          >
            <Ionicons name="images" size={20} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CameraScreen;
