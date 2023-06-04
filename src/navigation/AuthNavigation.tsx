import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "../screens/auth";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={SignupScreen} name="SignupScreen" />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
