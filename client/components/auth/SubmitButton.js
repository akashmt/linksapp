import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";

const SubmitButton = ({ title, handleSubmit, loading }) => (
  <TouchableOpacity 
    style={styles.btnTO}
    onPress={handleSubmit}
  >
    <Text bold medium center>
      {loading ? "Submitting..." : title}
    </Text>
  </TouchableOpacity>
);

export default SubmitButton;

const styles = StyleSheet.create({
  btnTO: {
    justifyContent: "center",
    marginBottom: 20,
    marginHorizontal: 20,
    height: 50,
    backgroundColor: "#ff9900",
    borderRadius: 24,
  },
});