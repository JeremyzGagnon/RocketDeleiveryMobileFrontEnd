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
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modal";

const url = "https://d76d-2607-fea8-fec0-85a9-b987-7b27-9f6c-b57e.ngrok.io";

const History = () => {
  // Attributes
  const type = "customer";
  const id = 10;
  const [history, setHistory] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  // const [modalTitle, setModalTitle] =  useState('');

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
    setModalData(item);
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      // add header row
      return (
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { flex: 1 }]}>ORDER</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>STATUS</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>VIEW</Text>
        </View>
      );
    } else {
      // add data rows
      return (
        <View style={styles.dataRow}>
          <Text style={[styles.dataCell, { flex: 1 }]}>
            {item.restaurant_name}
          </Text>
          <Text style={[styles.dataCell, { flex: 2 }]}>{item.status}</Text>
          <Button title="View ORDER" onPress={() => modalHistory(item)} />
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
      {/* MODAL */}
      <View style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>{modalData.restaurant_name}</Text>
            <Text>Order Summary</Text>
            {modalData.product_orders?.map((product) => (
              <Text key={product.product_id}>
                {product.product_name} ({product.quantity}): {product.unit_cost}
              </Text>
            ))}

            <Button title="Hide modal" onPress={modalHistory} />
          </View>
        </Modal>
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.order_id.toString()}
        contentContainerStyle={styles.list}
      />
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

export default History;
