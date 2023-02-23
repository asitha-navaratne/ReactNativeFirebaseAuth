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

  const { handleSignUp } = useAuth();

  return (
    <View style={styles.container} behaviour="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={user["firstName"]}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, firstName: text }))
          }
        />
        <TextInput
          placeholder="Last Name"
          value={user["lastName"]}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, lastName: text }))
          }
        />
        <TextInput
          placeholder="Email"
          value={user["email"]}
          onChangeText={(text) => setUser((prev) => ({ ...prev, email: text }))}
        />
        <TextInput
          placeholder="Phone"
          value={user["phone"]}
          keyboardType="phone-pad"
          maxLength={9}
          onChangeText={(text) => setUser((prev) => ({ ...prev, phone: text }))}
          mode="outlined"
          left={<TextInput.Affix text="+94" />}
        />
        <TextInput
          placeholder="Password"
          value={user["password"]}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, password: text }))
          }
          secureTextEntry
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
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default SignUpScreen;
