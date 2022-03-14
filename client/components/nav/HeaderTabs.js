import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HeaderTabs() {
  const [ state, setState ] = useContext(AuthContext);

  const signOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={signOut}>
        <FontAwesome5 name="sign-out-alt" size={25} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // margin: 10,
    // marginHorizontal: 30,
  },
  icon: {
    // alignSelf: "center",
    // marginBottom: 5,
  }
});