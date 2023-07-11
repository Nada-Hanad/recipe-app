import { useEffect, useState } from "react";
import "./App.css";
import SearchAppBar from "./components/appBar";
import RecipeReviewCard from "./components/card";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        "https://api.spoonacular.com/recipes/random?apiKey=YOUR_API_KEY&number=10"
      )
      .then((res) => {
        setRecipes(res.data.recipes);
        console.log(res.data.recipes);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function onSearchChange(event) {
    setLoading(true);
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=YOUR_API_KEY&query=${event.target.value}&number=10`
      )
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <main>
      <SearchAppBar onChange={onSearchChange} />
      <div className="recipes">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {recipes.map((e) => {
              return (
                <RecipeReviewCard
                  key={e.id}
                  title={e.title}
                  image={e.image}
                  summary={e.summary}
                  id={e.id}
                />
              );
            })}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
