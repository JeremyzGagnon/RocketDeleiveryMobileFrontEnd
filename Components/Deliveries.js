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
import Modal from "react-native-modal";

const url = "https://d61c-2605-b100-b32-4732-cd12-8d63-4957-c275.ngrok.io";

const Deliveries = () => {
  // Attributes
  const type = "courier";
  const id = 8;
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
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
    const itemWithProductOrders = {
      ...item,
      productOrdersText: item.product_orders.map(
        (productOrder) =>
          `${productOrder.quantity} x ${productOrder.product_name} ($${productOrder.unit_cost})`
      ),
    };
    setModalData(itemWithProductOrders);
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
          <Text style={[styles.dataCell, { flex: 1 }]}>{item.order_id}</Text>
          <Text style={[styles.dataCell, { flex: 2 }]}>
            {item.restaurant_address}
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
        <Text style={styles.headerText}>MY DELIVERIES</Text>
        <Button title="Fetch history" onPress={() => fetchHistory()} />
      </View>
      <View style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>DELIVERY DETAILS</Text>
            <Text>Status: {modalData.status}</Text>
            <Text>{modalData.order_id}</Text>
            <Text>Delivery Address: {modalData.customer_address}</Text>
            <Text>Restaurant: {modalData.restaurant_name}</Text>
            <Text>Order Date: {modalData.order_date}</Text>
            <Text>Order Details:</Text>
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

export default Deliveries;
