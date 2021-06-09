import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";
import {
  Wrapper,
  Heading,
  MaxWidthBreakpoints,
  Container,
  Button,
  Paragraph,
} from "../style/globalStyle";
import { FaSearch } from "react-icons/fa";
import Dropdown from "./Dropdown";

const StyledButton = styled(Button)`
  width: 40px;
  height: 40px;
  margin-left: 20px;
  padding-top: 6px;
  background: ${(props) => props.theme.color.secondary};
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontSize.xLarge};
  color: ${(props) => props.theme.color.white};
`;

const Input = styled.input`
  display: block;
  padding: 10px 20px;
  font-size: ${(props) => props.theme.fontSize.xLarge};
  color: ${(props) => props.theme.color.primary};
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 20px;
  :focus {
    outline: none;
  }
  @media ${MaxWidthBreakpoints.small} {
    width: 80%;
  } ;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: ${(props) => props.theme.fontWeight.bold}; ;
`;

const Select = styled.select`
  padding: 6px;
  border: 1px solid ${(props) => props.theme.color.greyDark};
  border-radius: 4px;
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
    "Balanced",
    "High-fiber",
    "High-protein",
    "Low-carb",
    "Low-fat",
    "Low-sodium",
  ]);
  const [mealTypeOptions] = useState([
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
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

    if (diet.toLowerCase() !== "all") {
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

  const handleDietChange = (value) => {
    setDiet(value.toLowerCase());
  };

  return (
    <Container>
      <Wrapper margin="20px" flexJC="space-between">
        <Wrapper width="60%" flexDirection="column" flexAI="flex-start">
          <Heading h1 margin="20px 0">
            Delicious Recipe
          </Heading>
          <Paragraph large margin="0 0 40px 0" textAlign="left">
            Make getting dinner on the table a breeze with these easy recipe
            ideas, which are sure to please the whole family.
          </Paragraph>

          <form onSubmit={onSubmit} id="searchForm">
            <Wrapper flexJC="flex-start" flexAI="center">
              <Input
                placeholder="search..."
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></Input>
              <StyledButton onClick={onSubmit}>
                <FaSearch />
              </StyledButton>
            </Wrapper>
            <Wrapper width="500px" flexJC="space-between">
              <Wrapper
                flexDirection="column"
                flexAI="flex-start"
                margin="40px 0"
              >
                <Label for="diet">Diet</Label>
                <Dropdown options={dietOptions} onChange={handleDietChange} />
                {/* <Select
                  name="diet"
                  id="diet"
                  value={diet}
                  onChange={(e) => {
                    setDiet(e.target.value);
                  }}
                >
                  {dietOptions.map((item, index) => (
                    <option value={item.toLowerCase()}>{item}</option>
                  ))}
                </Select> */}
              </Wrapper>
              <Wrapper
                flexDirection="column"
                flexAI="flex-start"
                margin="40px 0"
              >
                <Label for="mealType">Meal Type</Label>
                <Select
                  name="meal-type"
                  id="mealType"
                  value={mealType}
                  onChange={(e) => {
                    setMealType(e.target.value);
                  }}
                >
                  {mealTypeOptions.map((item, index) => (
                    <option value={item.toLowerCase()}>{item}</option>
                  ))}
                </Select>
              </Wrapper>
              <Wrapper
                flexDirection="column"
                flexAI="flex-start"
                margin="40px 0"
              >
                <Label for="cuisineType">Cuisine Type</Label>
                <Select
                  name="cuisine-type"
                  id="cuisineType"
                  value={cuisineType}
                  onChange={(e) => {
                    setCuisineType(e.target.value);
                  }}
                >
                  {cuisineTypeOptions.map((item, index) => (
                    <option value={item.toLowerCase()}>{item}</option>
                  ))}
                </Select>
              </Wrapper>
            </Wrapper>
          </form>
        </Wrapper>
      </Wrapper>
      <Wrapper>
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })}
        {/* {recipes.length !== 0 ? <div ref={loader}>load more</div> : null} */}
        <div ref={loader}></div>
      </Wrapper>
    </Container>
  );
};

export default Search;
