import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useAuth } from "../../contexts/AuthContext";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { handleSignIn } = useAuth();

  const changeTextVisibility = function () {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
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
        <Button onPress={() => handleSignIn(email, password)} mode="contained">
          Login
        </Button>
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
