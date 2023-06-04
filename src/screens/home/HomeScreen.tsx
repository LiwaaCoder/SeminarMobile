import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import React from "react";
import { Container, RecipeView } from "../../components";
import axios from "axios";
import { Recipe } from "../../types";
import { API_KEY } from "../../utils/Const";
import { Icons } from "../../../assets/thems";
import AuthContext from "../../context/AuthContext";
import { removeDataFromStorage } from "../../utils/LocalStorage";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const MAX_NUM = 2;

const FETCH_RECIPES_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=${MAX_NUM}`;

const HomeScreen = ({ navigation }: NativeStackHeaderProps) => {
  const { setUser } = React.useContext(AuthContext);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  const logout = async () => {
    await removeDataFromStorage("user");
    setUser(undefined);
  };

  const fetchRecipesWithParams = async () => {
    const _recipes: Recipe[] = [];
    try {
      const response = await axios.get(FETCH_RECIPES_URL);

      if (!response.data) return [];

      for (let r of response.data.recipes) {
        const url = `https://api.spoonacular.com/recipes/${r.id}/nutritionWidget.json/?apiKey=${API_KEY}`;
        const res = await axios.get(url);
        const nutrients = res.data.nutrients;

        const recipe: Recipe = {
          id: r.id,
          title: r.title,
          image: r.image,
          calories: 0,
          fat: "",
          protein: "",
          carbs: "",
        };

        for (let nutrient of nutrients) {
          switch (nutrient.name) {
            case "Calories":
              recipe.calories = nutrient.amount;
              break;
            case "Fat":
              recipe.fat = nutrient.amount + nutrient.unit;
              break;
            case "Net Carbohydrates":
              recipe.carbs = nutrient.amount + nutrient.unit;
              break;
            case "Protein":
              recipe.protein = nutrient.amount + nutrient.unit;
              break;
            default:
          }
        }
        _recipes.push(recipe);
      }
    } catch (err) {
      console.log(err);
    } finally {
      return _recipes;
    }
  };

  const loadMoreRecipes = async () => {};

  const fetchRecipes = async () => {
    const _recipes = await fetchRecipesWithParams();
    setRecipes(_recipes);
    setLoading(false);
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
          // onEndReached={loadMoreRecipes}
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
