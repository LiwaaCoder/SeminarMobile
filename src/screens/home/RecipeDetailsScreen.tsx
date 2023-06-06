import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { Container } from "../../components";
import { Icons } from "../../../assets/thems";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Recipe, RecipeDetails } from "../../types";
import { API_KEY } from "../../utils/Const";
import axios from "axios";

type RecipeDetailsScreen = NativeStackHeaderProps & {
  route: { params: { recipe: Recipe } };
};

const RecipeDetailsScreen = ({ navigation, route }: RecipeDetailsScreen) => {
  const [recipe, setRecipe] = React.useState<RecipeDetails | undefined>(
    undefined
  );

  React.useEffect(() => {
    const _recipe: Recipe = route.params.recipe;
    const fetchData = async () => {
      try {
        const FETCH_URL = `https://api.spoonacular.com/recipes/${_recipe.id}/information?apiKey=${API_KEY}&includeNutrition=false`;
        const response = await axios.get(FETCH_URL);
        const __recipe: RecipeDetails = {
          summary: response.data.summary,
          ingredients: [],
          id: _recipe.id,
          title: _recipe.title,
          image: _recipe.image,
          calories: _recipe.calories,
          fat: _recipe.fat,
          carbs: _recipe.carbs,
          protein: _recipe.protein,
        };

        for (let ingredient of response.data.extendedIngredients) {
          __recipe.ingredients.push({
            aisle: ingredient.aisle,
            amount: ingredient.amount,
            image: ingredient.image,
            unit: ingredient.unit,
          });
        }

        setRecipe(__recipe);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  });

  return (
    <Container style={{ backgroundColor: "rgb(202, 37, 64)" }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.header}
      >
        <Icons.ArrowBackIcon />
      </TouchableOpacity>

      {recipe === undefined ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={"white"} />
          <Text variant="titleLarge" style={{ color: "white" }}>
            Loading...
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View>
            <Image
              source={{ uri: recipe.image }}
              resizeMode="stretch"
              style={{ width: "100%", height: 200 }}
            />
            <Text
              variant="bodyLarge"
              style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}
            >
              {recipe.title}
            </Text>
          </View>

          <View style={{ padding: 10 }}>
            <Text variant="labelLarge">
              {recipe.summary.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <Text variant="titleLarge">Nutrition</Text>
            <View
              style={{
                backgroundColor: "#D3D3D3",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text
                  variant="headlineSmall"
                  style={{ color: "rgb(202, 37, 64)" }}
                >
                  Fat
                </Text>
                <Text variant="bodyLarge">{recipe.fat}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text
                  variant="headlineSmall"
                  style={{ color: "rgb(202, 37, 64)" }}
                >
                  Calories
                </Text>
                <Text variant="bodyLarge">{recipe.calories}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text
                  variant="headlineSmall"
                  style={{ color: "rgb(202, 37, 64)" }}
                >
                  Carbs
                </Text>
                <Text variant="bodyLarge">{recipe.carbs}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text
                  variant="headlineSmall"
                  style={{ color: "rgb(202, 37, 64)" }}
                >
                  Protein
                </Text>
                <Text variant="bodyLarge">{recipe.protein}</Text>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
            <Text variant="titleLarge">Ingredients</Text>
            {recipe.ingredients.map((value, index) => (
              <View
                key={index.toString()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={{
                    uri: `https://spoonacular.com/cdn/ingredients_100x100/${value.image}`,
                  }}
                  style={{ width: 100, height: 100, flex: 1 }}
                  resizeMode="stretch"
                />
                <Text style={{ flex: 2 }}>{value.aisle}</Text>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Text>X{value.amount}</Text>
                  <Text>{value.unit}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 35,
    height: 35,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
