import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Products from "./Products";

const url = "https://7c03-98-143-255-3.ngrok.io";

const Restaurants = () => {
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();
  // const restaurant_id = 2

  const fetchRestaurants = () => {
    fetch(`${url}/api/restaurants?rating=${rating}&price_range=${price}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      })
      .catch((error) => console.error(error));
  };


  useEffect(() => {
    fetchRestaurants();
  }, [rating, price]);

  const handleRestaurantPress = (restaurantId, name, price_range, rating) => {
    navigation.navigate('Products', { restaurantId, name, price_range, rating });
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRestaurantPress(item.id, item.name, item.price_range, item.rating )}>
      <View style={styles.restaurant}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{`Rating: ${item.rating}, Price Range: ${item.price_range}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: 20,
            marginBottom: 10,
          }}
        >
          NEARBY RESTAURANTS
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Rating</Text>
          <Text>Price</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Picker
            selectedValue={rating}
            style={{ height: 40, width: "45%" }}
            onValueChange={(itemValue) => setRating(itemValue)}
          >
            <Picker.Item label="--Select--" value="" />
            <Picker.Item label="⭐️" value="1" />
            <Picker.Item label="⭐️⭐️" value="2" />
            <Picker.Item label="⭐️⭐️⭐️" value="3" />
            <Picker.Item label="⭐️⭐️⭐️⭐️" value="4" />
            <Picker.Item label="⭐️⭐️⭐️⭐️⭐️" value="5" />
          </Picker>
          <Picker
            selectedValue={price}
            style={{ height: 40, width: "45%" }}
            onValueChange={(itemValue) => setPrice(itemValue)}
          >
            <Picker.Item label="--Select--" value="" />
            <Picker.Item label="﹩" value="1" />
            <Picker.Item label="﹩﹩" value="2" />
            <Picker.Item label="﹩﹩﹩" value="3" />
          </Picker>
        </View>
      </View>
      <View style={{ flex: 1.4 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          RESTAURANTS
        </Text>
        <FlatList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  restaurant: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

export default Restaurants;
  