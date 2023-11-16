import { View, Text, Button ,StyleSheet,TouchableOpacity,Image,Modal,TextInput} from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
const UploadButtonComponent = () => {
  
    const [fileName,setFileName] = useState("Upload PDF")
    const [isModalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
      name: null,
      age: null,
      sex: null,
      address: null,
      contact: null,
    });

    const baseUrl = "http://06fb-2a09-bac1-36e0-58-00-1f1-1b8.ngrok-free.app/";

    const handleSubmit = () => {
      // Convert the form data to a JSON object
      const formDataJson = formData;
    
      axios.post(baseUrl +'ocr/', formDataJson, {
        headers: {
          'Content-Type': 'application/json', // Adjust this header based on your API's requirements
        },
      })
      .then(response => {
        // Handle the API response here (e.g., show a success message, redirect, etc.)
        console.log('API Response:', response.data);
      })
      .catch(error => {
        // Handle API request errors (e.g., show an error message)
        console.error('API Request Error:', error);
      });
    };
    
    
    const updateField = (fieldName, value) => {
      setFormData({ ...formData, [fieldName]: value });
    };


    const ModalContent = () => {
      return (
      <View>
        <Text>Modal Content</Text>
        <Text>Name : </Text>
        <TextInput
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => updateField('name', text)}
        />
        <TextInput
          placeholder="Age"
          value={formData.age}
          onChangeText={(text) => updateField('age', text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Gender"
          value={formData.sex}
          onChangeText={(text) => updateField('sex', text)}
        />
        <TextInput
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => updateField('address', text)}
        />
        <TextInput
          placeholder="Contact"
          value={formData.contact}
          onChangeText={(text) => updateField('contact', text)}
          keyboardType="phone-pad"
        />
        <Button title="Submit" onPress={handleSubmit} />
  </View>
      );
    };

    const pickDocument = async () => {
        try {
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
      button: {
        width: 100, // Adjust the width and height as needed for a larger button
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 50, // Make it round for a circular button
      },
      container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        width: 160, // Adjust the image size to fit the button
        height: 160,
      },
  });