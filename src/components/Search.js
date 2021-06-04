import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";
import { Wrapper, Heading, MaxWidthBreakpoints } from "../style/globalStyle";

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
  const [resultIndex, setResultIndex] = useState(20);
  // add loader refrence
  const loader = useRef(null);
  //   const [firstLoad, setFirstLoad] = useState(true);
  const [diet, setDiet] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [cuisineType, setCuisineType] = useState("All");
  const [dietOptions] = useState([
    "All",
    "balanced",
    "high-fiber",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium",
  ]);
  const [mealTypeOptions] = useState([
    "All",
    "breakfast",
    "lunch",
    "dinner",
    "snack",
  ]);
  const [cuisineTypeOptions] = useState([
    "All",
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

  const getRecipes = async () => {
    const YOUR_APP_ID = `ee9e203c`;
    const YOUR_APP_KEY = "192f9138c18a3585a19ba1067b12fdee";
    const url = `https://api.edamam.com/search`;
    const params = {
      q: search,
      app_id: YOUR_APP_ID,
      app_key: YOUR_APP_KEY,
      to: resultIndex,
    };

    if (diet !== "All") {
      params.diet = diet;
    }
    if (mealType !== "All") {
      params.mealType = mealType;
    }
    if (cuisineType !== "All") {
      params.cuisineType = cuisineType;
    }

    try {
      const result = await axios.get(url, { params });
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
  }, [diet, mealType, cuisineType, resultIndex]);

  useEffect(() => {
    if (search === "") {
      setDiet("All");
      setMealType("All");
      setCuisineType("All");
      getRecipes();
    }
  }, [search]);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setResultIndex((resultIndex) => resultIndex + 10);
    }
  };

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
            value={diet}
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
            value={mealType}
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
            value={cuisineType}
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
        {/* {recipes.length !== 0 ? <div ref={loader}>load more</div> : null} */}
        <div ref={loader}></div>
      </Wrapper>
    </>
  );
};

export default Search;
