interface User {
  avatar: string;
  role: string;
  email: string;
  username: string;
}

interface Ingredient {
  aisle: string;
  amount: number;
  image: string;
  unit: string;
}
interface Recipe {
  id: number;
  title: string;
  image: string;
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
}

interface RecipeDetails extends Recipe {
  summary: string;
  ingredients: Ingredient[];
}

export { User, Recipe, RecipeDetails };
