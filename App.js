import * as React from "react";
import { Button, View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**
 * Linking Configuration
 */
const linking = {
  // Prefixes accepted by the navigation container, should match the added schemes
  prefixes: ["myapp://"],
  // Route config to map uri paths to screens
  config: {
    // Initial route name to be added to the stack before any further navigation,
    // should match one of the available screens
    initialRouteName: "Home",
    screens: {
      // myapp://home -> HomeScreen
      Home: "home",
      // myapp://details/1 -> DetailsScreen with param id: 1
      Details: "details/:id",
    },
  },
};

/**
 * Data
 */
const groceryItems = [
  { id: 1, name: "Apples" },
  { id: 2, name: "Bananas" },
  { id: 3, name: "Oranges" },
  { id: 4, name: "Milk" },
  { id: 5, name: "Bread" },
];

/**
 * Screens
 */
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Grocery List</Text>
      {/* FlatList to render the list of grocery items */}
      <FlatList
        style={styles.list}
        data={groceryItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1 }}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text>
        Item:
        {groceryItems.find((item) => item.id === Number(route.params.id))
          ?.name ?? "Not Found"}
      </Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

/**
 * Stack Navigator
 */
const Stack = createNativeStackNavigator();

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  },
  button: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;