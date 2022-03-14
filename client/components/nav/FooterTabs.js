import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import { AuthContext } from "../context/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "react-native-elements";

export const Tab = ({ name, text, handlePress, screenName, routeName }) => {
  const activeScreenColor = screenName === routeName && "orange";

  return (
    <TouchableOpacity onPress={handlePress} >
      <FontAwesome5 
        name={name} 
        size={20} 
        style={styles.icon} 
        screenName={screenName}
        routeName={routeName}
        color={activeScreenColor}
      />
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default function FooterTabs() {
  const navigation = useNavigation();
  const route = useRoute();
  // console.log("ROUTE =>", route);

  // const handlePress = () => {
  //   alert("pressed");
  // };
  // Just to test working
  // then pass 'handlePress={handlePress}' as property on Tab component(s)

  return (
    <>
      <Divider width={1} />
      <View style={styles.container}>
        <Tab 
          text="Home" 
          name="home" 
          handlePress={() => navigation.navigate("Home")} 
          screenName="Home"
          routeName={route.name}
        />
        <Tab 
          text="Post" 
          name="plus-square" 
          handlePress={() => navigation.navigate("Post")} 
          screenName="Post"
          routeName={route.name}
        />
        <Tab 
          text="Links" 
          name="list-ol" 
          handlePress={() => navigation.navigate("Links")} 
          screenName="Links"
          routeName={route.name}
        />
        <Tab 
          text="Account" 
          name="user" 
          handlePress={() => navigation.navigate("Account")} 
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginHorizontal: 30,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 5,
  }
});