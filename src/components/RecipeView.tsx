import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Caption, Text } from "react-native-paper";
import { Recipe } from "../types";
import { Icons } from "../../assets/thems";

interface RecipeViewProps {
  recipe: Recipe;
  onPress: VoidFunction;
}

const RecipeView = ({ recipe, onPress }: RecipeViewProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="stretch"
      />

      <View style={styles.detailsWrapper}>
        <Text variant="titleSmall" style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>

        <View style={styles.caloriesWrapper}>
          <Icons.FireIcon size={16} color="red" />
          <Text>{recipe.calories}</Text>
          <Text>cals</Text>
        </View>
      </View>

      <View style={styles.bottomWrapper}>
        <View style={{ alignItems: "center" }}>
          <Caption>Net Carbs</Caption>
          <Text>{recipe.carbs}</Text>
        </View>

        <View style={{ width: 0.5, backgroundColor: "gray", height: 25 }} />

        <View style={{ alignItems: "center" }}>
          <Caption>Fat</Caption>
          <Text>{recipe.fat}</Text>
        </View>

        <View style={{ width: 0.5, backgroundColor: "gray", height: 25 }} />

        <View style={{ alignItems: "center" }}>
          <Caption>Protein</Caption>
          <Text>{recipe.protein}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: 240,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
    borderColor: "gray",
    borderWidth: 0.2,
    elevation: 5,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 100,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsWrapper: {
    paddingHorizontal: 20,
  },
  caloriesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    gap: 5,
  },
  bottomWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
});
export default RecipeView;
