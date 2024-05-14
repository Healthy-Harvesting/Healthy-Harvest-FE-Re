import React, { useState } from "react";
import { Text } from "react-native";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ImageGrid = ({ images }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const renderThumbnail = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedImage(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {images?.slice(0, 3).map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedImage(image);
              setModalVisible(true);
            }}
          >
            <Image source={{ uri: image }} style={styles.headerImage} />
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  headerImage: {
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    borderRadius: 10,
  },
  thumbnail: {
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    margin: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ImageGrid;
