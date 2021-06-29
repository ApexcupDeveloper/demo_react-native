/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-crop-picker';
import { PESDK } from 'react-native-photoeditorsdk';

const noImageURL = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedImg, setImage] = useState('')

  const uploadImage = () => {
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      setImage(image.path)
    }).catch(err => {
      Alert.alert("Error", err.message);
    });
  }

  const editImage = () => {
    if (!selectedImg) {
      Alert.alert('Error', 'Please upload image')
      return
    }

    PESDK.openEditor({ uri: selectedImg }).then(img => {
      setImage(img.image)
    }).catch(err => {
      Alert.alert("Error", err.message);
    });
  }

  const publishImage = () => {
    if (!selectedImg) {
      Alert.alert('Error', 'Please upload image')
      return
    }

    Alert.alert('Call API')
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: Colors.white,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          paddingHorizontal: '5%'
        }}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: selectedImg ? selectedImg : noImageURL }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
          />
        </View>
        <TouchableOpacity style={styles.btnUpload} onPress={uploadImage}>
          <Text style={styles.txtUpload}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnUpload, { borderColor: '#ea4a09' }]} onPress={editImage}>
          <Text style={[styles.txtUpload, { color: '#ea4a09' }]}>Edit Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPublish} onPress={publishImage}>
          <Text style={styles.txtPublish}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnUpload: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1683e4'
  },
  btnPublish: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1683e4',
    marginVertical: 10,
    borderRadius: 10,
  },
  txtUpload: {
    fontSize: 16,
    color: '#1683e4'
  },
  txtPublish: {
    fontSize: 16,
    color: 'white'
  },
  imgContainer: {
    width: '100%',
    height: 300,
    marginBottom: 30
  }
});

export default App;
