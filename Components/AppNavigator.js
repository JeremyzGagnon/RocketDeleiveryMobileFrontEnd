import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./authentification";
import Restaurant from "./restaurants";
import Banner from "./banner";


const Stack = createStackNavigator();

const AppNavigator = () => {

  // Attributes
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
      initialRouteName="Restaurants"
    >
      <Stack.Screen name="Restaurants" component={Restaurant} />
    </Stack.Navigator>
  );

  return (
    // Return the appropriate stack when loged in or not with the banner
    <NavigationContainer>
      {isAuthenticated && <Banner setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
