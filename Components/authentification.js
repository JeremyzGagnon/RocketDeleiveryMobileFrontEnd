import React, { useState, Component } from "react";
import { View, Text, StyleSheet, TextInput, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const urlNgrok =
  "https://4389-2607-fea8-fec0-85a9-7042-1700-ec4a-3f84.ngrok.io";

const Auth = ({ setIsAuthenticated, setIsClient, setIsCourier }) => {
  // Attributes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // Methods
  const handleLogin = () => {
    fetch(urlNgrok + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setIsAuthenticated(true);
        // navigation.navigate("Restaurants");

        // console.log("DATA");
        // console.log(data);
        // const isCustomer = !isNaN(data.customer_id);

        // console.log("isCustomer");
        // console.log("Value: " + isCustomer)
        // console.log(isCustomer == true);

        // const isCourrier = !isNaN(data.courier_id);
        // console.log("isCourrier");
        // console.log("Value: " + isCourrier)
        // console.log(isCourrier == true);
        // console.log(isCourrier && isCustomer && isUser)

        const isUser = true;
        const isCustomer = false;
        const isCourrier = false;

        // Determine where to send the user
        if (isCustomer && !isCourrier) {
          setIsAuthenticated(true);
          setIsClient(true);
          navigation.navigate("Restaurants");
        } else if (isCourrier && !isCustomer) {
          setIsAuthenticated(true);
          // navigation.navigate("Courrier");
        } else if (isCustomer && isCourrier) {
          setIsClient(true);
          setIsCourier(true);
          setIsAuthenticated(true);

          navigation.navigate("Home"); //page de selection
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/Images/AppLogoV2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to begin</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          // value="pauletta.watsica@bednar-leannon.io"
          value={email}
          onChangeText={(text) => setEmail(text)}
          required={true}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry={true}
          // value="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          required={true}
        />
        <Button title="Log in" onPress={handleLogin} />
      </View>
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
  content: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  logo: {
    width: 300,
    height: 200,
    marginTop: 30,
    marginBottom: 20,
  },
});

export default Auth;
