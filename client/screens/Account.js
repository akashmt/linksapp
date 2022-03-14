import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import axios from "axios";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import CircleLogo from "../components/auth/CircleLogo";
// import JsonView from "../components/misc/JsonView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ role, setRole ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loading, setLoading ] = useState(false);
  // Image
  const [ uploadImage, setUploadImage ] = useState("");
  const [ image, setImage ] = useState({
    url: "",
    public_id: "",
  });
  // Context
  const [ state, setState ] = useContext(AuthContext);

  // console.log("NAVIGATION -> ", navigation);

  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if ( !email || !password ) {
      alert("All fields are required.");
      setLoading(false);
      return;
    }
    
    console.log("SIGN IN REQUEST => ", email, password);

    try {
      const { data } = await axios.post(`/signin`, {
        email: email,
        password: password,
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in Context
        setState(data);
        // Save response in async storage
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setLoading(false);
        console.log("SIGN IN SUCCESS => ", data);
        alert("Sign in successful.");
      }
      // redirect
      navigation.navigate("Home");
    } catch (err) {
      alert("Sign in failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  }

  const handleUpload = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(permissionResult);
    // return;

    if (permissionResult.granted === false) {
      alert("Camera access is required.");
      return;
    }

    // **GET image from Image Library
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [ 4,3 ],
      base64: true,
    });

    // console.log("IMAGEPICKER RESULT => ", pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    //**SAVE to state for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);

    //**SEND to backend for uploading to cloudinary
    let token = state && state.token ? state.token : "";
    const { data } = await axios.post(
      "/upload-image", 
      {
        image: base64Image,
      }, 
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    console.log("UPLOADED RESPONSE => ", data);

    //**UPDATE user info in the context and async storage

  }

  //*** TEST AsyncStorage Function
  // const loadFromAsyncStorage = async () => {
  //   let data = await AsyncStorage.getItem("@auth");
  //   console.log("FROM ASYNC STORAGE => ", data);
  // }
  // loadFromAsyncStorage();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollviewContainer}>
      <View Style={styles.container}>
        <CircleLogo>
          {image && image.url ? (
            <Image 
              source={{ uri: image.url }}
              style={{ 
                marginVertical: 20,
                width: 190, 
                height: 190, 
                borderRadius: 100,
              }}
            />
          ) : uploadImage ? (
            <Image 
              source={{ uri: uploadImage }}
              style={{ 
                marginVertical: 20,
                width: 190, 
                height: 190, 
                borderRadius: 100,
              }}
            />
          ) : (
            <TouchableOpacity onPress={ () => handleUpload()}>
              <FontAwesome5 name="camera" size={25} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>

        {image && image.url ? (
          <TouchableOpacity onPress={ () => handleUpload()}>
            <FontAwesome5 
              name="camera" 
              size={25} 
              color="orange" 
              style={styles.iconUpload} 
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <Text title center style={styles.title}>{name}</Text>
        <Text medium center style={styles.subtitle}>{email}</Text>
        <Text medium center light style={styles.role}>{role}</Text>
        
        <UserInput 
          name="PASSWORD" 
          value={password} 
          setValue={setPassword}
          secureTextEntry={true} 
          autoCompleteType="password"
        />
        <SubmitButton title="Update Password" handleSubmit={handleSubmit} loading={loading} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Account;

const styles = StyleSheet.create({
  scrollviewContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {

  },
  iconUpload: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  title: {
    marginBottom: 10,
    color: "#ccc",
  },
  subtitle: {
    marginBottom: 10,
    color: "#ccc",
  },
  role: {
    marginBottom: 50,
  },
  fieldControl: {
    marginHorizontal: 24,
  },
  textTextInput: {
    color: "#ff2222" 
  },
  textInput: {
    marginBottom: 30,
    height: 48,
    borderBottomWidth: 0.5,
    borderBottomColor: "#8e93a1"
  },
});