import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";

import { useAuth } from "../../contexts/AuthContext";

const SignUpScreen = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [checkPassword, setCheckPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCheckPasswordVisible, setIsCheckPasswordVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSignUp, isLoading } = useAuth();

  const handleButtonClick = function () {
    if (!(Object.keys(user).every((key) => user[key]) && checkPassword)) {
      alertErrorMessage("Please fill in all fields!");
      return;
    }

    if (!checkPasswordsMatching()) {
      alertErrorMessage("Passwords should match!");
    } else {
      handleSignUp(user).catch((err) => {
        if (err.code === "auth/invalid-email") {
          alertErrorMessage("Invalid email address format!");
        } else if (err.code === "auth/email-already-exists") {
          alertErrorMessage("Email already exists!");
        } else if (err.code === "auth/weak-password") {
          alertErrorMessage("Password is too short!");
        } else {
          alertErrorMessage("An error occured! Please try again.");
        }
      });
    }
  };

  const checkPasswordsMatching = function () {
    return user["password"] === checkPassword;
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
        <View style={styles.container} behaviour="padding">
          <View style={styles.inputContainer}>
            <TextInput
              label="First Name"
              value={user["firstName"]}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, firstName: text }))
              }
              mode="outlined"
              style={styles.textInput}
            />
            <TextInput
              label="Last Name"
              value={user["lastName"]}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, lastName: text }))
              }
              mode="outlined"
              style={styles.textInput}
            />
            <TextInput
              label="Email"
              value={user["email"]}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, email: text }))
              }
              mode="outlined"
              style={styles.textInput}
            />
            <TextInput
              label="Phone"
              value={user["phone"]}
              keyboardType="phone-pad"
              maxLength={9}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, phone: text }))
              }
              mode="outlined"
              left={<TextInput.Affix text="+94" />}
              style={styles.textInput}
            />
            <TextInput
              label="Password"
              value={user["password"]}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, password: text }))
              }
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? "eye" : "eye-off"}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
              style={styles.textInput}
              secureTextEntry={!isPasswordVisible}
            />
            <TextInput
              label="Re-enter Password"
              value={checkPassword}
              onChangeText={(text) => setCheckPassword(text)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={isCheckPasswordVisible ? "eye" : "eye-off"}
                  onPress={() =>
                    setIsCheckPasswordVisible(!isCheckPasswordVisible)
                  }
                />
              }
              style={styles.textInput}
              secureTextEntry={!isCheckPasswordVisible}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleButtonClick}>
              Register
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
    marginTop: 6,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default SignUpScreen;
