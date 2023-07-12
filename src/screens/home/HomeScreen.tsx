import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import axios from "axios";
import { Recipe, RecipeDetails } from "../../types";
import { Icons } from "../../../assets/thems";
import AuthContext from "../../context/AuthContext";
import { removeDataFromStorage } from "../../utils/LocalStorage";
import { Container, RecipeView } from "../../components";

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

const fetchRecipesUrl = "http://localhost:8084/superapp/miniapp/dietitiansHelper";

const HomeScreen = ({ navigation }: NativeStackHeaderProps) => {
  const { setUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

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
        const _recipe: RecipeDetails = {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          calories: Math.round(recipe.calories.amount),
          fat: `${Math.round(recipe.fat.amount)} ${recipe.fat.unit}`,
          carbs: `${Math.round(recipe.carbs.amount)} ${recipe.carbs.unit}`,
          protein: `${Math.round(recipe.protein.amount)} ${recipe.protein.unit}`,
          summary: "",
          ingredients: [],
        };

        for (let ingredient of recipe.extendedIngredients) {
          _recipe.ingredients.push({
            aisle: ingredient.name,
            amount: ingredient.amount,
            image: ingredient.image,
            unit: ingredient.unit,
          });
        }
        _recipes.push(_recipe);
      }

      setRecipes(_recipes);

      // Filter the recipes based on the search term
      const filtered = _recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container style={{ backgroundColor: "#F5F5F5" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
          <Icons.LogoutIcon />
        </TouchableOpacity>
        <Text variant="displaySmall" style={styles.titleText}>
          Recipes
        </Text>
        <Searchbar
          value={search}
          onChangeText={(txt) => {
            setSearch(txt);
            const filtered = recipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(txt.toLowerCase())
            );
            setFilteredRecipes(filtered);
          }}
          mode="bar"
          style={styles.searchBar}
          placeholder="Search..."
        />
      </View>
      <View style={styles.body}>
        <FlatList
          ListEmptyComponent={
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={"large"} color={"#CA2540"} />
              <Text variant="titleLarge" style={styles.loadingText}>
                Loading...
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          data={filteredRecipes}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <RecipeView
              recipe={item}
              onPress={() =>
                navigation.navigate("RecipeDetailsScreen", { recipe: item })
              }
              titleStyle={styles.recipeTitle}
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
  titleText: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 24,
    alignSelf: "center",
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#CA2540",
    fontSize: 24,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
});
