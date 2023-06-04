import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, RecipeDetailsScreen } from "../screens/home";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen
        component={RecipeDetailsScreen}
        name="RecipeDetailsScreen"
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
