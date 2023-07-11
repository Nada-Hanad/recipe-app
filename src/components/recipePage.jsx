import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipePage() {
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=YOUR_API_KEY`
      )
      .then((res) => {
        setRecipe(res.data);
        console.log(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="recipe-page">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="recipe">
          <h1>{recipe.title}</h1>
          <p>{recipe.summary}</p>
        </div>
      )}
    </div>
  );
}
