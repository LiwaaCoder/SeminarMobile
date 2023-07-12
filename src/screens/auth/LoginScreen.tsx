import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import { Container } from "../../components";
import AuthContext from "../../context/AuthContext";
import { saveDataToStorage } from "../../utils/LocalStorage";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Images } from "../../../assets/thems";
import { BASE_URL } from "../../utils/Const";
import axios from "axios";
import { User } from "../../types";

const VALID_LOGIN_URL = `${BASE_URL}/users/login/2023b.gil.azani`;

const LoginScreen = ({ navigation }: NativeStackHeaderProps) => {
  const { setUser } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setError(false);
    if (email === "") {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`${VALID_LOGIN_URL}/${email}`);

      const user: User = {
        avatar: res.data.avatar,
        role: res.data.role,
        email: res.data.userId.email,
        username: res.data.username,
      };

      await saveDataToStorage("user", user);
      setUser(user);
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <Container style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login To Our RecipesMenu </Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email"
          value={email}
          placeholder="test@test.com"
          onChangeText={(text) => setEmail(text)}
          error={error}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLogin}
          loading={loading}
        >
          Login
        </Button>
        <Divider style={styles.divider} />
        <Button
          mode="contained-tonal"
          style={styles.signupButton}
          labelStyle={styles.signupButtonText}
          onPress={handleSignup}
        >
          Signup
        </Button>
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 20,
  },
  buttonsContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  loginButton: {
    width: 200,
    marginTop: 10,
    backgroundColor: "rgb(202, 37, 64)",
  },
  divider: {
    width: "80%",
    marginBottom: 5,
  },
  signupButton: {
    backgroundColor: "rgb(202, 37, 64)",
    borderRadius: 10,
    marginVertical: 10,
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 8,
  },
});
