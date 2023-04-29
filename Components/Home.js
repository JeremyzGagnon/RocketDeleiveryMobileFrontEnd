import React, { useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  // Attributes
  const navigation = useNavigation();

  // Methods
const clientScreen = () => {
  navigation.navigate("Restaurants")
}

const courierScreen = () => {
  navigation.navigate("Deliveries")
}
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Images/AppLogoV2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text>Select Account Type</Text>
      <TouchableOpacity>
        <Button title="User Page" onPress={clientScreen}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button title="Courier Page" onPress={courierScreen} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 200,
    marginTop: 30,
    marginBottom: 20,
  }
})

export default Home;
