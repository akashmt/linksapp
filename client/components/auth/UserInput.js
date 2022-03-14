import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Text from "@kaloraat/react-native-text";

const UserInput = ({ 
  name, 
  value, 
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
}) => {

  return (
      <View style={styles.fieldControl}>
        <Text semi style={styles.textTextInput}>{name}</Text>
        <TextInput 
          style={styles.textInput}
          value={value}
          onChangeText={(text) => setValue(text)}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
  );
}

export default UserInput;

const styles = StyleSheet.create({
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
  }
});