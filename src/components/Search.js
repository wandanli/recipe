import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";
import {
  Wrapper,
  Heading,
  MaxWidthBreakpoints,
  Button,
} from "../style/globalStyle";

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: ${(props) => props.theme.fontSize.xLarge};
  color: ${(props) => props.theme.color.primary};
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: 8px;
  :focus {
    outline: none;
  }
  @media ${MaxWidthBreakpoints.small} {
    width: 80%;
  } ;
`;

const Search = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("balanced");
  const [mealType, setMealType] = useState("breakfast");
  const [cuisineType, setCuisineType] = useState("Asian");
  const [dietOptions] = useState([
    "balanced",
    "high-fiber",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium",
  ]);
  const [mealTypeOptions] = useState(["breakfast", "lunch", "dinner", "snack"]);
  const [cuisineTypeOptions] = useState([
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ]);

  const YOUR_APP_ID = `ee9e203c`;
  const YOUR_APP_KEY = "192f9138c18a3585a19ba1067b12fdee";

  const url = `https://api.edamam.com/search`;

  const getRecipes = async () => {
    try {
      const result = await axios.get(url, {
        params: {
          q: search,
          app_id: YOUR_APP_ID,
          app_key: YOUR_APP_KEY,
          diet: diet,
          mealType: mealType,
          cuisineType: cuisineType,
        },
      });
      setRecipes(result.data.hits);
      console.log(result.data.hits);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  useEffect(() => {
    getRecipes();
  }, [diet, mealType, cuisineType]);

  return (
    <>
      <Wrapper flexDirection="column" margin="20px">
        <Heading primary>Recipe</Heading>

        <form onSubmit={onSubmit}>
          <Input
            placeholder="search..."
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></Input>
          <select
            name="diet"
            onChange={(e) => {
              setDiet(e.target.value);
            }}
          >
            {dietOptions.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select
            name="meal-type"
            onChange={(e) => {
              setMealType(e.target.value);
            }}
          >
            {mealTypeOptions.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select
            name="cuisine-type"
            onChange={(e) => {
              setCuisineType(e.target.value);
            }}
          >
            {cuisineTypeOptions.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </form>
      </Wrapper>
      <Wrapper>
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })}
      </Wrapper>
    </>
  );
};

export default Search;
