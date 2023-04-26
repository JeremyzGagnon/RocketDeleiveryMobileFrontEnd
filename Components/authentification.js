import React, { useState, Component } from "react";
import { View, Text, StyleSheet, TextInput, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const urlNgrok =
  "https://bdd9-2607-fea8-fec0-85a9-c0fc-89d6-eb11-77d2.ngrok.io";

const Auth = ({ setIsAuthenticated, setIsClient }) => {
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

        console.log("DATA");
        console.log(data);
        isUser = data.user_id;
        console.log("isUser");
        console.log(isUser == true);
        isCustomer = data.customer_id;

        console.log("isCustomer");
        console.log(isCustomer == true);

        isCourrier = data.courier_id;
        console.log("isCourrier");
        console.log(isCourrier == true);
        console.log(isCourrier && isCustomer && isUser)
        isUser = true;
        isCustomer = false
        isCourrier = false;
        // Determine where to send the user
        if (isCustomer && !isUser && !isCourrier) {
          console.log("isCustomer && !isUser && !isCourrier");
          setIsAuthenticated(true);

          navigation.navigate("Restaurants");
        } else if (isCourrier && !isCustomer && isUser) {
          console.log("isCourrier && !isCustomer && isUser");
          setIsAuthenticated(true);

          // navigation.navigate("Courrier");
        } else if (isCustomer && isCourrier && !isUser) {
          console.log("isCustomer && isCourrier && !isUser");
          setIsAuthenticated(true);

          navigation.navigate("Home");
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
