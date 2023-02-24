import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../contexts/AuthContext";

const HomeScreen = () => {
  const { authData, handleSignOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text>User ID: {authData.uid}</Text>
        <Text>
          Name: {authData.firstName}&nbsp;{authData.lastName}
        </Text>
        <Text>Email: {authData.email}</Text>
        <Text>Phone: {authData.phone}</Text>
        <Text>User ID: {authData.uid}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    borderColor: "#aaa",
    borderWidth: 5,
    borderRadius: 5,
    padding: 11,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HomeScreen;
