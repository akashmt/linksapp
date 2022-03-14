import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";

const Home = () => {
  const [ state, useState ] = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text title center light>Home</Text>
      {/* <Text>{JSON.stringify(state, null, 4)}</Text> */}

      <View style={styles.footer}>
        <FooterTabs/>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1, 
    justifyContent: "flex-end"
  }
});