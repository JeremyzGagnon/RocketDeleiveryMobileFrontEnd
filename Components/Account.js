import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  // Attributes
  const [text, setText] = useState("");
  // Methods
  const handleInputChange = (text) => {
    setText(text);
  };

  return (
    <View>
      <Text style={styles.label}>MY ACCOUNT</Text>
      <Text>Logged In As: {}</Text>

      <View style={styles.container}>
        <Text style={styles.label}>Primary Email (Read Only)</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="User's Email goes here"
        />
        <Text style={styles.helpText}>
          Email used to login to the aplpication
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Customer Email:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Customer' email goes here"
        />
        <Text style={styles.helpText}>
          Email used for your Customer account.
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Customer Phone:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="User's phone number goes here"
        />
        <Text style={styles.helpText}>
          Phone number for your Customer account
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>UPDATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  helpText: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    backgroundColor: "#D1553B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Account;
