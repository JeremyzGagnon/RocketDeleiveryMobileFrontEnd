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
import { Modal } from "react-native";

const url = "https://bdd9-2607-fea8-fec0-85a9-c0fc-89d6-eb11-77d2.ngrok.io";

const Products = (props) => {
  // Attributes
  const { restaurantId, name, price_range, rating } = props.route.params;
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //   console.log("RESTAURANT ID")
  //   console.log(restaurantId)
  //   console.log("RESTAURANT NAME")
  //   console.log(name)
  //   console.log("RESTAURANT PRICE RANGE")
  //   console.log(price_range)
  //   console.log("RESTAURANT RATING")
  //   console.log(rating)

  // Methods

  const handleCreateOrder = () => {
    setModalVisible(true);
  };

  const fetchProducts = () => {
    fetch(url + `/api/products?restaurant=${restaurantId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("DATA");
        // console.log(data);
        const productsWithCount = data.map((product) => ({
          ...product,
          count: 0,
        }));
        // console.log("*********PRODUCT WITH COUNT***********");
        // console.log(productsWithCount);

        // Do something with the data
        setProducts(productsWithCount);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleIncrement = (productId) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((p) => p.id === productId);
    if (index !== -1) {
      updatedProducts[index].count += 1;
      setProducts(updatedProducts);
    }
  };

  const handleDecrement = (productId) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((p) => p.id === productId);
    if (index !== -1 && updatedProducts[index].count > 0) {
      updatedProducts[index].count -= 1;
      setProducts(updatedProducts);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{`$${item.cost / 100}`}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Button title="-" onPress={() => handleDecrement(item.id)} />
        <Text style={styles.count}>{item.count}</Text>
        <Button title="+" onPress={() => handleIncrement(item.id)} />
      </View>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </View>
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
          RESTAURANT MENU
        </Text>

        <View style={styles.infoContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.info}>Price: {price_range}</Text>
            <Text style={styles.info}>Rating: {rating}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Button title="CREATE ORDER" onPress={handleCreateOrder} />
          </TouchableOpacity>
        </View>

        <Button title="Fetch products test" onPress={fetchProducts} />

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text>Hello!</Text>
            </View>
          </View>
        </Modal>

        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});

export default Products;
