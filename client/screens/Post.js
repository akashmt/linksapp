import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";

export default function Post() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Post Screen</Text>
      <View style={styles.footer}>
        <FooterTabs/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1, 
    justifyContent: "flex-end"
  }
});