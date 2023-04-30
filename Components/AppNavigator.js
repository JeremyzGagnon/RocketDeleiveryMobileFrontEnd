import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "./authentification";
import Restaurant from "./restaurants";
import Banner from "./banner";
import Products from "./Products";
import History from "./orders-history";
import Home from "./Home";
import Account from "./Account";
import Deliveries from "./Deliveries";

import DeliveriesModal from "./deliveryModal"; //delete

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  // Attributes
  const [isAuthenticated, setIsAuthenticated] = useState(true); // chnage this to false
  const [isClient, setIsClient] = useState(false);
  const [isCourier, setIsCourier] = useState(false);

  const AuthStack = () => (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Authentification"
    >
      <Stack.Screen name="Authentification">
        {(props) => (
          <Auth
            {...props}
            setIsAuthenticated={setIsAuthenticated}
            setIsClient={setIsClient}
            setIsCourier={setIsCourier}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );

  const ClientStack = () => (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName="Restaurants"
    >
      <Stack.Screen name="History" component={History} />

      <Stack.Screen name="Deliveries" component={Deliveries} />
      <Stack.Screen name="DeliveriesModal" component={DeliveriesModal} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Restaurants" component={Restaurant} />
      <Stack.Screen name="Products" component={Products} />
    </Stack.Navigator>
  );

  const CourierStack = () => (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Authentification"
    >
      <Stack.Screen name="Account" component={Account} />={" "}
      <Stack.Screen name="Deliveries" component={Deliveries} />

    </Stack.Navigator>
  );

  const TabNavigation = () => (
    <Tab.Navigator >
      <Tab.Screen name="Restaurants" component={ClientStack} />
      <Tab.Screen name="Order History" component={History} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );

  return (
    // Return the appropriate stack when logged in or not with the banner
    <NavigationContainer>
      {isAuthenticated && <Banner setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated ? <ClientStack /> : <AuthStack />}
      {/* {isAuthenticated ? <TabNavigation /> : <AuthStack />} */}
      {/* {isAuthenticated && <Tabulation />} */}
    </NavigationContainer>
    
  );
};

export default AppNavigator;
