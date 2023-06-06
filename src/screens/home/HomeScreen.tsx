import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import React from "react";
import { Container, RecipeView } from "../../components";
import axios from "axios";
import { Recipe } from "../../types";
import { Icons } from "../../../assets/thems";
import AuthContext from "../../context/AuthContext";
import { removeDataFromStorage } from "../../utils/LocalStorage";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const PARAMS = {
  commandId: {
    superapp: "2023b.gil.azani",
    miniapp: "",
    internalCommandId: "",
  },
  command: "GET_RANDOM_RECIPE",
  targetObject: {
    objectId: {
      superapp: "2023b.gil.azani",
      internalObjectId: "9aafac7f-1f57-4062-9e40-ba5126c7c5d3",
    },
  },
  invocationTimestamp: "",
  invokedBy: {
    userId: {
      superapp: "2023b.gil.azani",
      email: "yarden1@example.com",
    },
  },
  commandAttributes: {
    number: 10,
  },
};

const fetchRecipesUrl =
  "http://localhost:8084/superapp/miniapp/dietitiansHelper";

const HomeScreen = ({ navigation }: NativeStackHeaderProps) => {
  const { setUser } = React.useContext(AuthContext);
  const [search, setSearch] = React.useState("");
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  const logout = async () => {
    await removeDataFromStorage("user");
    setUser(undefined);
  };

  const fetchRecipes = async () => {
    try {
      const response = await axios.post(fetchRecipesUrl, PARAMS);
      if (!response.data) return;
      const _recipes: Recipe[] = [];
      for (let recipe of response.data) {
        const _recipe: Recipe = {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          calories: Math.round(recipe.calories.amount),
          fat: `${Math.round(recipe.fat.amount)} ${recipe.fat.unit}`,
          carbs: `${Math.round(recipe.carbs.amount)} ${recipe.carbs.unit}`,
          protein: `${Math.round(recipe.protein.amount)} ${
            recipe.protein.unit
          }`,
        };
        _recipes.push(_recipe);
      }
      setRecipes(_recipes);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container style={{ backgroundColor: "rgb(202, 37, 64)" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
          <Icons.LogoutIcon />
        </TouchableOpacity>
        <Text
          variant="displaySmall"
          style={{ color: "white", fontWeight: "bold", marginBottom: 10 }}
        >
          Recipes
        </Text>
        <Searchbar
          value={search}
          onChangeText={(txt) => setSearch(txt)}
          mode="bar"
          style={{ backgroundColor: "white", borderRadius: 10 }}
          placeholder="Search..."
        />
      </View>
      <View style={styles.body}>
        <FlatList
          ListEmptyComponent={<Text variant="titleLarge">Loading...</Text>}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          data={recipes}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <RecipeView
              recipe={item}
              onPress={() =>
                navigation.navigate("RecipeDetailsScreen", { recipe: item })
              }
            />
          )}
        />
      </View>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    margin: 10,
  },
  body: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
  },
  logoutBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 99,
  },
});
