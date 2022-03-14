import React from "react";
import { StyleSheet, View, Image } from "react-native";

const CircleLogo = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {children ? (
          children
        ) : (
          <Image 
            source={require("../../assets/cardinals-bw.png")}
            style={styles.brand}
          />
        )}
      </View>
    </View>
  );
}

export default CircleLogo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 10,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 190,
    height: 190,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  brand: {
    // marginVertical: 40,
    marginBottom: 20,
    width: 80,
    height: 80,
  }
});