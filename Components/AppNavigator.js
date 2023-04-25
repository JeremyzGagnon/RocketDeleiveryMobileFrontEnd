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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  // Attributes
  // chnage to false
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isClient, setIsClient] = useState(true);


  const AuthStack = () => (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Authentification"
    >
      <Stack.Screen name="Authentification">
        {(props) => <Auth {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  const MainStack = () => (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName="Restaurants"
    >
      <Stack.Screen name="Restaurants" component={Restaurant} />
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );

  const TabNavigation = () => (
    <Tab.Navigator initialRouteName="Restaurants">
      <Tab.Screen name="Restaurants" component={MainStack} />
      <Tab.Screen name="Order History" component={History} />
    </Tab.Navigator>
  );

  return (
    // Return the appropriate stack when logged in or not with the banner
    <NavigationContainer>
      {isAuthenticated && <Banner setIsAuthenticated={setIsAuthenticated} />}
      {/* {isAuthenticated ? <MainStack /> : <AuthStack />} */}
      {isAuthenticated ? <TabNavigation /> : <AuthStack />}
      {/* {isAuthenticated && <Tabulation />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
