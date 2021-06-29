import React from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Alert,
    Image
} from 'react-native';
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import {
    PESDK
} from 'react-native-photoeditorsdk';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../components/Button';
import http from '../service/http';
import { baseURL } from '../service/baseURL';

declare global {
    interface FormDataValue {
        uri: string;
        name: string;
        type: string;
    }

    interface FormData {
        append(name: string, value: FormDataValue, fileName?: string): void;
        set(name: string, value: FormDataValue, fileName?: string): void;
    }
}

const noImageURL = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg';

const Home = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [selectedImg, setImage] = useState('')
    const [imgType, setType] = useState('')
    const [imgName, setName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const uploadImage = () => {
        if(isLoading) return
        ImagePicker.openPicker({
            cropping: false
        }).then(image => {
            setImage(image.path)
            setType(image.mime)
            setName(image.filename ? image.filename : 'upload.png')
        }).catch(err => {
            Alert.alert("Error", err.message);
        });
    }

    const editImage = () => {
        if(isLoading) return
        if (!selectedImg) {
            Alert.alert('Error', 'Please upload image')
            return
        }

        PESDK.openEditor({ uri: selectedImg }).then(img => {
            setImage(img.image)
        }).catch(err => {
            Alert.alert("Error", 'User cancelled.');
        });
    }

    const publishImage = () => {
        if (!selectedImg) {
            Alert.alert('Error', 'Please upload image')
            return
        }
        setLoading(true)
        const data = new FormData()
        data.append('image', {
            name: imgName,
            type: imgType,
            uri: selectedImg
        })
        http.post('/products/upload', data)
            .then((res) => {
                setImage(baseURL + res.data.url)
                setLoading(false)
            }).catch((err) => {
                Alert.alert('Error', err.message)
                setLoading(false)
            })
    }

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View
                style={[backgroundStyle, styles.container]}>
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
                <Button
                    title="Upload Image"
                    buttonStyle={styles.btnUpload}
                    textStyle={styles.txtUpload}
                    onClick={uploadImage}
                />
                <Button
                    title="Edit Image"
                    buttonStyle={[styles.btnUpload, { borderColor: '#ea4a09' }]}
                    textStyle={[styles.txtUpload, { color: '#ea4a09' }]}
                    onClick={editImage}
                />
                <Button
                    title="Publish"
                    buttonStyle={styles.btnPublish}
                    textStyle={styles.txtPublish}
                    onClick={publishImage}
                    loading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        paddingHorizontal: '5%'
    },
    btnUpload: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

export default Home;
