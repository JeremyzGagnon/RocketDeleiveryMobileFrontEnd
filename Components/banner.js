import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const Banner = ({ setIsAuthenticated }) => {
  const handleLogoutPress = () => {
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.banner}>
      <View style={styles.logo}>
        <Image source={require('../assets/Images/AppLogoV1.png')} style={styles.logo} resizeMode="contain" />
      </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoutButton: {
    backgroundColor: "#D1553B",
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default Banner;
