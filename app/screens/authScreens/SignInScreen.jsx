import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";

import { useAuth } from "../../contexts/AuthContext";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSignIn, isLoading } = useAuth();

  const handleButtonClick = function () {
    if (email === "" || password === "") {
      alertErrorMessage("Please fill in all fields!");
    } else {
      handleSignIn(email, password).catch((err) => {
        if (err.code === "auth/invalid-email") {
          alertErrorMessage("Invalid email address format!");
        } else if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password"
        ) {
          alertErrorMessage("Email or password is incorrect!");
        } else {
          alertErrorMessage("An error occured! Please try again.");
        }
      });
    }
  };

  const changeTextVisibility = function () {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const alertErrorMessage = function (message) {
    setIsErrorVisible(true);
    setErrorMessage(message);
  };

  const dismissErrorMessage = function () {
    setIsErrorVisible(false);
    setErrorMessage("");
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#f28b3d" />
        </View>
      ) : (
        <View style={styles.container} behavior="padding">
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? "eye" : "eye-off"}
                  onPress={changeTextVisibility}
                />
              }
              style={styles.textInput}
              secureTextEntry={!isPasswordVisible}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleButtonClick} mode="contained">
              Login
            </Button>
          </View>
          <Snackbar
            visible={isErrorVisible}
            onDismiss={dismissErrorMessage}
            action={{
              label: "OK",
              onPress: dismissErrorMessage,
            }}
          >
            {errorMessage}
          </Snackbar>
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
  inputContainer: {
    width: "80%",
  },
  textInput: {
    marginTop: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default SignInScreen;
