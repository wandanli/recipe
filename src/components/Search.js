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
import WaveUp from "../images/wave-up.svg";
import WaveBottom from "../images/wave-bottom.svg";
import FoodImg from "../images/food.jpeg";
import ScrollToTop from "./ScrollToTop";
import GithubLink from "./GithubLink";

const StyledButton = styled(Button)`
  width: 40px;
  height: 40px;
  margin-left: 20px;
  padding-top: 6px;
  background: ${(props) => props.theme.color.secondary};
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontSize.xLarge};
  color: ${(props) => props.theme.color.white};
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;

const Input = styled.input`
  display: block;
  padding: 10px 20px;
  font-size: ${(props) => props.theme.fontSize.xLarge};
  color: ${(props) => props.theme.color.secondary};
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
  width: 180px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const Span = styled.span`
  background: linear-gradient(to top, #f2b5b3 30%, transparent 50%);
`;

const HeaderBg = styled.div`
  width: 100vw;
  height: 540px;
  background-color: #fff9f4;
  background-image: url(${WaveUp}), url(${WaveBottom});
  background-repeat: no-repeat;
  background-position: left -40px, left bottom;
  /* color: ${(props) => props.theme.color.primary}; */
`;

const ImageWrapper = styled(Wrapper)`
  width: 380px;
  height: 500px;
  background-image: url(${FoodImg});
  background-repeat: no-repeat;
  background-size: contain;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
`;

const RecipesWrapper = styled(Wrapper)`
  background-color: #fafff4;
  border-radius: 10px;
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
    if (mealType.toLowerCase() !== "all") {
      params.mealType = mealType;
    }
    if (cuisineType.toLowerCase() !== "all") {
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

  const handleMealTypeChange = (value) => {
    setMealType(value.toLowerCase());
  };

  const handleCuisineTypeChange = (value) => {
    setCuisineType(value.toLowerCase());
  };

  return (
    <>
      <GithubLink />
      <HeaderBg>
        <Container>
          <Wrapper margin="20px" flexJC="space-between" flexAI="flex-start">
            <Wrapper width="60%" flexDirection="column" flexAI="flex-start">
              <Heading h1 margin="20px 0">
                Delicious Recipe
              </Heading>
              <Paragraph large margin="0 0 70px 0" textAlign="left">
                Make getting dinner on the table a breeze with these easy recipe
                ideas, which are sure to please the whole family.
              </Paragraph>

              <form onSubmit={onSubmit} id="searchForm">
                <Wrapper flexJC="flex-start" flexAI="center">
                  <Input
                    autoFocus
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
                <Wrapper width="600px" flexDirection="column" margin="60px 0">
                  <Wrapper width="100%" flexJC="space-between">
                    <Label>
                      <Span>Diet</Span>
                    </Label>
                    <Label>
                      <Span>Meal Type</Span>
                    </Label>
                    <Label>
                      <Span>Cuisine Type</Span>
                    </Label>
                  </Wrapper>

                  <Wrapper
                    width="100%"
                    flexJC="space-between"
                    flexAI="flex-start"
                  >
                    <Dropdown
                      options={dietOptions}
                      onChange={handleDietChange}
                    />
                    <Dropdown
                      options={mealTypeOptions}
                      onChange={handleMealTypeChange}
                    />
                    <Dropdown
                      options={cuisineTypeOptions}
                      onChange={handleCuisineTypeChange}
                    />
                  </Wrapper>
                </Wrapper>
              </form>
            </Wrapper>
            <ImageWrapper></ImageWrapper>
          </Wrapper>

          <RecipesWrapper margin="120px 0">
            {recipes !== [] &&
              recipes.map((recipe) => {
                return <RecipeCard recipe={recipe} />;
              })}
            {/* {recipes.length !== 0 ? <div ref={loader}>load more</div> : null} */}
            <div ref={loader}></div>
          </RecipesWrapper>
        </Container>
      </HeaderBg>
      <ScrollToTop />
    </>
  );
};

export default Search;
