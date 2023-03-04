import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import { useAuth } from "../../contexts/AuthContext";

const HomeScreen = () => {
  const { isLoading, authToken, handleSignOut } = useAuth();

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#f28b3d" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.info}>
            <Text>User ID: {authToken.uid}</Text>
            <Text>
              Name: {authToken.firstName}&nbsp;{authToken.lastName}
            </Text>
            <Text>Email: {authToken.email}</Text>
            <Text>Phone: +94{authToken.phone}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleSignOut}>
              Sign Out
            </Button>
          </View>
        </View>
      )}
    </>
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
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default HomeScreen;
