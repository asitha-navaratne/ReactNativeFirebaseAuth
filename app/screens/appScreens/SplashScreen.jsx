import { Image, StyleSheet, Text, View } from "react-native";

const SplashScreen = () => (
  <View style={styles.container}>
    <Image source={require("../../assets/images/favicon.png")} />
    <Text style={styles.text}>Splash Screen!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
  },
});

export default SplashScreen;
