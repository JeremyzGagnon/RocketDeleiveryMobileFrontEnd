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

  // Methods

  return (
    <View>
      <Text>Hello</Text>
      <TouchableOpacity>
        <Button title="User Login" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Button title="Courier Login" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
