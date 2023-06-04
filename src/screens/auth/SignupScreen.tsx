import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
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
    if (name == "") {
      setNameError(true);
      status = false;
    }
    if (email == "") {
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
      const res = await axios.post(
        "http://localhost:8084/superapp/users",
        user
      );

      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert("faled to create user!");
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
      <Text variant="displaySmall">Create new account</Text>
      <View>
        <TextInput
          style={{ marginVertical: 10 }}
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
          style={{ marginVertical: 10 }}
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
        style={{ marginVertical: 20, backgroundColor: "rgb(202, 37, 64)" }}
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
    padding: 10,
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
    marginHorizontal: 10,
  },
});
