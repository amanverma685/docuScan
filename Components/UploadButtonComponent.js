import { View, Text, Button ,StyleSheet,ActivityIndicator,TouchableOpacity,Image,Modal,TextInput} from 'react-native'
import React, { useState,useEffect } from 'react'
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UploadButtonComponent = () => {

  const [userToken, setUserToken] = useState("");

    const [isLoading, setisLoading] = useState(false);
    const [fileName,setFileName] = useState("Upload PDF or Image")
    const [isModalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
      name: null,
      age: null,
      sex: null,
      address: null,
      contact: null,
    });

    const updateUserToken  = async() =>{
      const userTokenAsync = await AsyncStorage.getItem('token');
      setUserToken(userTokenAsync);

    }

    useEffect(() => {
      updateUserToken();
    },)
    
    const baseUrl = "http://3979-2a09-bac1-36c0-58-00-277-17.ngrok-free.app/";

    const handleSubmit = async() => {
      setisLoading(true);
      // Convert the form data to a JSON object
      const formDataJson = formData;
    
      await axios.post(baseUrl +'ocr/', formDataJson, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+userToken,
        },
      })
      .then(response => {
        // Handle the API response here (e.g., show a success message, redirect, etc.)
        Alert.alert(
          'Submitted Successfully',
          'The data has been saved Successfully.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
            
          ],
          { cancelable: true }
        );
        console.log('API Response:', response.data);
      })
      .catch(error => {
        // Handle API request errors (e.g., show an error message)
        console.error('API Request Error:', error);
      });

    setModalVisible(false);
    setFileName("Upload PDF or Image to parse")
    };
    
    
    const updateField = (fieldName, value) => {
      setFormData({ ...formData, [fieldName]: value });
    };


    const ModalContent = () => {
      return (
      <View >
        <View >
        <Text>User Details</Text>
        </View>
        <Text>Name : </Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => updateField('name', text)}
        />
        
        <Text>Date of Birth : </Text>
        <TextInput
          placeholder="Age"
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => updateField('age', text)}
          keyboardType="numeric"
        />
          
        <Text>Gender : </Text>
        <TextInput
          placeholder="Gender"
          value={formData.sex}

          style={styles.input}
          onChangeText={(text) => updateField('sex', text)}
        />
        
        <Text>Address : </Text>

        <TextInput
          placeholder="Address"
          value={formData.address}
          style={styles.input}
          onChangeText={(text) => updateField('address', text)}
        />
        
        <Text>Contact : </Text>

        <TextInput
          placeholder="Contact"
          value={formData.contact}
          style={styles.input}
          onChangeText={(text) => updateField('contact', text)}
          keyboardType="phone-pad"
        />
        <Button title="Submit"  onPress={handleSubmit}>
        </Button>
  </View>
      );
    };

    const pickDocument = async () => {
        try {
          setisLoading(true);
            const result = await DocumentPicker.getDocumentAsync({
                type:["*/*"],
                copyToCacheDirectory:true
            });
            console.log(result);
            if(result.canceled==false)
            {
                setFileName(result.assets[0].name)

                const formDataFile = new FormData();
                formDataFile.append('image', {
                  uri: result.assets[0].uri,
                  type: result.assets[0].mimeType,
                  name: result.assets[0].name,
                });
                const response = await axios.post(baseUrl+'ocr/readImage', formDataFile, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Bearer "+userToken,
                    }});

                console.log('File upload success:', response.data);
                setModalVisible(true);
                setFormData(response.data.data);
                } else {
                  console.log('Document picking cancelled');
                }
        }
        catch (error) {
      console.error('Error uploading file:', error);
    }
      };

  return (
    <View style={styles.container1}>
      <Text>
      <View style={styles.container}>
      <View>
        <Text style={styles.largeText}>{fileName}</Text>
      </View>

      <View style={styles.half}>
      <View style={styles.separator} />

        <TouchableOpacity onPress={pickDocument} style={styles.button}>
            <Image source={require('../assets/upload.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
      </Text>

      {isModalVisible && (
      <Modal visible={isModalVisible} animationType="slide">
        <ModalContent />
      </Modal>
    )}
    </View>
  )
}

export default UploadButtonComponent

const styles = StyleSheet.create({
    container: {
      flex: 1, // This ensures that the container takes up the entire screen.
      flexDirection: 'column', // Arrange children vertically (horizontally would be 'row').
    },
    half: {
      flex: 1, // Each half takes up an equal amount of space.
    },
    separator: {
        width: 1, // Set the width of the separator
        height: '100%', // Make the separator the same height as the views
        backgroundColor: 'whilte', // Color of the separator
      },
    largeText: {
        fontSize: 24, // Adjust the font size as needed
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
      },
      button: {
        width: 100, // Adjust the width and height as needed for a larger button
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 50, // Make it round for a circular button
      },
      container1: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        width: 160, // Adjust the image size to fit the button
        height: 160,
      },
      // container2: {
      //   flex: 1,
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // },
  });
