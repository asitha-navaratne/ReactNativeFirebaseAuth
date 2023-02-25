import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useAuth } from "../../contexts/AuthContext";

const SignUpScreen = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { handleSignUp } = useAuth();

  const changeTextVisibility = function () {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
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
          onChangeText={(text) => setUser((prev) => ({ ...prev, email: text }))}
          mode="outlined"
          style={styles.textInput}
        />
        <TextInput
          label="Phone"
          value={user["phone"]}
          keyboardType="phone-pad"
          maxLength={9}
          onChangeText={(text) => setUser((prev) => ({ ...prev, phone: text }))}
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
              onPress={changeTextVisibility}
            />
          }
          style={styles.textInput}
          secureTextEntry={!isPasswordVisible}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => handleSignUp(user)}>
          Register
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
