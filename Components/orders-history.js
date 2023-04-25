import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const url = "https://ed11-98-143-255-3.ngrok.io";

const History = () => {
  // Attributes
  const type = "customer";
  const id = 10;
  const [history, setHistory] = useState([]);


  // Methods
  const fetchHistory = () => {
    fetch(url + `/api/orders?type=${type}&id=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("DATA");
        console.log(data);

        // Do something with the data
        setHistory(data)
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }) => (
    
    <View style={styles.product}>
      <Text style={styles.name}>{item.id}</Text>
      <Text style={styles.name}>{item.order_status_id}</Text>
    </View>
  );



  return (
    <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: 20,
            marginBottom: 10,
          }}
        >
          MY ORDERS
        </Text>
        <Button title="Fetch history" onPress={() => fetchHistory()} />
        <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />


    </View>
  );
  
};

const styles = StyleSheet.create({
  product: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  count: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 14,
    marginTop: 10,
  },
  list: {
    paddingBottom: 50,
  },
});


export default History;
