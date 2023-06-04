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
      <Image
        source={Images.LoginScreenImage}
        style={styles.image}
        resizeMode="stretch"
      />

      <View style={{ marginTop: 20, padding: 10 }}>
        <Text variant="displaySmall">Login</Text>
        <TextInput
          style={{ marginVertical: 10 }}
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
      <View style={styles.buttonsWRapper}>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={handleLogin}
          loading={loading}
        >
          Login
        </Button>
        <Divider bold />
        <Button
          mode="contained-tonal"
          style={[styles.btn, { opacity: 0.6 }]}
          labelStyle={{ color: "white" }}
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
  container: {},
  buttonsWRapper: { marginTop: 20 },
  btn: {
    width: 200,
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "rgb(202, 37, 64)",
  },
  image: {
    width: "90%",
    height: 200,
    alignSelf: "center",
  },
});
