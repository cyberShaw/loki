import React, { useState, useReducer, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

import * as Location from "expo-location";

const screenWidth = Dimensions.get("screen").width;

export const SplashScreen = () => {
  // Hooks
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState<Location.Address>()
  const [displayAddress, setDisplayAddress] = useState("Waiting for Current Location");

  useEffect(() => {
    (
        async() => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to Access Location is not granted :(');
            }
            let location = await Location.getCurrentPositionAsync({});
            const { coords } = location
            if (coords) {
                const { latitude, longitude } = coords;
                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude });
                for(let item of addressResponse) {
                    setAddress(item)
                    let currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`;
                    setDisplayAddress(currentAddress)
                    return
                }
            } else {

            }
        }
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container}></View>
      <View style={styles.body}>
        <Image
          source={require("../../assets/delivery_icon.png")}
          style={styles.deliveryIcon}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>

        <Text style={styles.addressText}>{displayAddress}</Text>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryIcon: {
    width: 120,
    height: 120,
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: "red",
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  addressTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#707070",
  },
  addressText: {
    fontSize: 20,
    fontWeight: "200",
    color: "#4f4f4f",
  },
  footer: {
    flex: 1,
    // backgroundColor: "cyan",
  },
});
