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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const url = "https://d61c-2605-b100-b32-4732-cd12-8d63-4957-c275.ngrok.io";

const DeliveriesModal = () => {
  // Attributes
  const type = "courier";
  const id = 8;
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
        setHistory(data);
      })
      .catch((error) => console.error(error));
  };

  

  useEffect(() => {
    fetchHistory();
  }, []);

  const modalHistory = (item) => {
    setModalVisible(!isModalVisible);
    setModalData(item)
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      // add header row
      return (
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { flex: 1 }]}>ORDER ID</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>ADDRESS</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>STATUS</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>VIEW</Text>
        </View>
      );
    } else {
      // add data rows
      return (
        <View style={styles.dataRow}>
          <Text style={[styles.dataCell, { flex: 1 }]}>
            {item.order_id}
          </Text>
          <Text style={[styles.dataCell, { flex: 2 }]}>{item.restaurant_address}</Text>
          <Text style={[styles.dataCell, { flex: 2 }]}>{item.status}</Text>
          <Button title="View ORDER" onPress={() => modalHistory(history)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MY DELIVERIES</Text>
        <Button title="Fetch history" onPress={() => fetchHistory()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "black",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  dataCell: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default DeliveriesModal;
