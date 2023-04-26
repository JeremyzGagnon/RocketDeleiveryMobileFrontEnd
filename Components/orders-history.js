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

const url = "https://bdd9-2607-fea8-fec0-85a9-c0fc-89d6-eb11-77d2.ngrok.io";

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

  const renderItem = ({ item, index }) => {
    if (index === 0) { // add header row
      return (
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { flex: 1 }]}>Order</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Status</Text>
          
        </View>
      );
    } else { // add data rows
      return (
        <View style={styles.dataRow}>
          <Text style={[styles.dataCell, { flex: 1 }]}>{item.id}</Text>
          <Text style={[styles.dataCell, { flex: 2 }]}>{item.order_status_id}</Text>
        </View>
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MY ORDERS</Text>
        <Button title="Fetch history" onPress={() => fetchHistory()} />
      </View>
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
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  dataCell: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default History;
