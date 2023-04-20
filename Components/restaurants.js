import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";


const url = "https://515d-2607-fea8-fec0-85a9-5019-83f4-35e6-706f.ngrok.io"
// Class
const Restaurants = () => {
  
  // Attributes
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
// Method
  const restaurante  = () => {
    fetch(url + `/api/restaurants?rating=${rating}&price_range=${price}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("DATA");
      console.log(data);
    })
    .catch(error => console.error(error));
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: 20, marginBottom: 10 }}>
          NEARBY RESTAURANTS
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text >Rating</Text>
          <Text >Price</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Picker
            selectedValue={rating}
            style={{ height: 40, width: "45%" }}
            onValueChange={(itemValue) => setRating(itemValue)}
          >
            <Picker.Item label="--Select--" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
          <Picker
            selectedValue={price}
            style={{ height: 40, width: "45%" }}
            onValueChange={(itemValue) => setPrice(itemValue)}
          >
            <Picker.Item label="--Select--" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
        </View>
      </View>
      <View style={{flex: 1.4}}>
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          RESTAURANTS
        </Text>
        <Button title="Test back endw" onPress={restaurante} />

      </View>
    </View>
  );
};

export default Restaurants;
  