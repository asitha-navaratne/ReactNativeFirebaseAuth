import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container} behaviour="padding">
      <View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("Login")} mode="contained">
            Login
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("Register")}
            mode="outlined"
          >
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 5,
  },
});

export default WelcomeScreen;
