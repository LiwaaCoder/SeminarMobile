import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Container } from "../../components";
import { saveDataToStorage } from "../../utils/LocalStorage";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { User } from "../../types";
import axios from "axios";
import { BASE_URL } from "../../utils/Const";
import { Icons } from "../../../assets/thems";

const CREATE_USER_URL = `${BASE_URL}/users`;

const SignupScreen = ({ navigation }: NativeStackHeaderProps) => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const validation = () => {
    let status = true;
    if (name === "") {
      setNameError(true);
      status = false;
    }
    if (email === "") {
      setEmailError(true);
      status = false;
    }

    return status;
  };

  const handleCreateAccount = async () => {
    setNameError(false);
    setEmailError(false);
    const status = validation();

    if (!status) return;
    setLoading(true);
    try {
      const user: User = {
        avatar: name,
        role: "MINIAPP_USER",
        email: email,
        username: email,
      };
      const res = await axios.post(CREATE_USER_URL, user);

      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert("Failed to create user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.header}
      >
        <Icons.ArrowBackIcon color="gray" />
      </TouchableOpacity>
      <Text style={styles.title}>Create New Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Full Name"
          value={name}
          placeholder="Kuku Kuku"
          onChangeText={(text) => setName(text)}
          error={nameError}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email"
          value={email}
          placeholder="test@test.com"
          onChangeText={(text) => setEmail(text)}
          error={emailError}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <Button
        mode="contained"
        style={styles.button}
        loading={loading}
        onPress={handleCreateAccount}
      >
        Create Account
      </Button>
    </Container>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 35,
    height: 35,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#202cb9",
  },
});
