import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";
import { AuthContext } from "../context/auth";

export default function Account() {
  const [ state, useState ] = useContext(AuthContext);
  const { name, email, role } = state.user;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text title center light>Account</Text>
        </View>
        <View>
          <Text title bold>{name}</Text>
          <Text medium>{email}</Text>
          <Text light>{role}</Text>
        </View>
      </ScrollView>
      {/* 
      <View style={styles.footer}>
        <FooterTabs/>
      </View> 
      */}
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