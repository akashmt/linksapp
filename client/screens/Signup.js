import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import axios from "axios";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import CircleLogo from "../components/auth/CircleLogo";
// import JsonView from "../components/misc/JsonView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Context
  const [state, setState] = useContext(AuthContext);

  // console.log("NAVIGATION -> ", navigation);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required.");
      setLoading(false);
      return;
    }

    console.log("SIGN UP REQUEST => ", name, email, password);

    try {
      const { data } = await axios.post(`/signup`, {
        name: name,
        email: email,
        password: password,
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save to context
        setState(data);
        // Save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        if (loading) {
          setLoading(false);
        }
        console.log("SIGN IN SUCCESS => ", data);
        alert("Sign up successful.");
      }
      // redirect
      navigation.navigate("Home");
    } catch (err) {
      alert("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  //*** TEST AsyncStorage Function
  // const loadFromAsyncStorage = async () => {
  //   let data = await AsyncStorage.getItem("@auth");
  //   console.log("FROM ASYNC STORAGE => ", data);
  // }
  // loadFromAsyncStorage();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollviewContainer}>
      <View Style={styles.container}>
        <CircleLogo />
        <Text title center style={styles.formTitle}>
          Sign Up
        </Text>

        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Text small center>
          Already joined?{" "}
          <Text color="#ff2222" onPress={() => navigation.navigate("Signin")}>
            Sign In
          </Text>
        </Text>

        {/* <JsonView name={name} email={email} password={password}/> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  scrollviewContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {},
  formTitle: {
    color: "#ccc",
  },
  fieldControl: {
    marginHorizontal: 24,
  },
  textTextInput: {
    color: "#ff2222",
  },
  textInput: {
    marginBottom: 30,
    height: 48,
    borderBottomWidth: 0.5,
    borderBottomColor: "#8e93a1",
  },
});
