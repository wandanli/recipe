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
import FoodImg from "../images/food.png";
import HFoodImg from "../images/food-2.png";
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
    width: 70%;
    font-size: ${(props) => props.theme.fontSize.medium};
  } ;
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const Span = styled.span`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 65%, #f2b5b3 65%);
  /* background: linear-gradient(to top, #f2b5b3 30%, transparent 50%); */
`;

const HeaderBg = styled.div`
  width: 100vw;
  height: 540px;
  background-color: #fff9f4;
  background-image: url(${WaveUp}), url(${WaveBottom});
  background-repeat: no-repeat;
  background-position: left -40px, left bottom;
  @media ${MaxWidthBreakpoints.small} {
    height: 800px;
  }
  /* color: ${(props) => props.theme.color.primary}; */
`;

const HeaderWrapper = styled(Wrapper)`
  @media ${MaxWidthBreakpoints.large} {
    display: block;
  }
  @media ${MaxWidthBreakpoints.medium} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ImageWrapper = styled(Wrapper)`
  width: 40%;
  height: 500px;
  background-image: url(${FoodImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom right;
  @media ${MaxWidthBreakpoints.large} {
    /* background-color: black; */
    background-size: cover;
    background-position: 0 -172px;
    /* display: block; */
    background-image: url(${HFoodImg});
    /* background-position: top right; */
    width: 398px;
    height: 234px;
    position: absolute;
    top: 90px;
    right: 80px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  @media ${MaxWidthBreakpoints.medium} {
    display: none;
  }
`;

const ContentWrapper = styled(Wrapper)`
  @media ${MaxWidthBreakpoints.large} {
    margin: 40px 20px;
    width: 90%;
  }
  @media ${MaxWidthBreakpoints.small} {
    margin: 10px 0;
    width: 100%;
  }
`;

const RecipesWrapper = styled(Wrapper)`
  background-color: #fafff4;
  border-radius: 10px;
  @media ${MaxWidthBreakpoints.small} {
    margin: 60px 0;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  @media ${MaxWidthBreakpoints.large} {
    width: 60%;
    z-index: 1;
  }
  @media ${MaxWidthBreakpoints.medium} {
    width: 100%;
  }
  @media ${MaxWidthBreakpoints.small} {
    margin-bottom: 30px;
  }
`;

const SelectWrapper = styled(Wrapper)`
  margin-top: 30px;
  @media ${MaxWidthBreakpoints.medium} {
    margin-top: 0;
  }

  @media ${MaxWidthBreakpoints.small} {
    width: 100%;
    display: block;
  }
`;

const SearchBarWrapper = styled(Wrapper)`
  @media ${MaxWidthBreakpoints.small} {
    justify-content: space-between;
  }
`;

const Search = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [resultIndex, setResultIndex] = useState(20);
  const [errorMessage, setErrorMessage] = useState("");
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
      if (diet === "All" && mealType === "All" && cuisineType === "All") {
        getRecipes();
      } else {
        setDiet("All");
        setMealType("All");
        setCuisineType("All");
      }
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
          <HeaderWrapper
            margin="40px 0"
            flexJC="space-between"
            flexAI="flex-start"
          >
            <ContentWrapper
              width="58%"
              flexDirection="column"
              flexAI="flex-start"
            >
              <Heading h1 margin="20px 0">
                Delicious Recipe
              </Heading>
              <StyledParagraph large margin="0 0 70px 0" textAlign="left">
                Make getting dinner on the table a breeze with these easy recipe
                ideas, which are sure to please the whole family.
              </StyledParagraph>

              <Form onSubmit={onSubmit} id="searchForm">
                <SearchBarWrapper flexJC="flex-start" flexAI="center">
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
                </SearchBarWrapper>

                <SelectWrapper
                  width="100%"
                  flexAI="flex-start"
                  flexJC="space-between"
                >
                  <Wrapper
                    flexDirection="column"
                    flexAI="flex-start"
                    margin="40px 0 0 0"
                  >
                    <Label>
                      <Span>Diet</Span>
                    </Label>
                    <Dropdown
                      options={dietOptions}
                      onChange={handleDietChange}
                      search={search}
                    />
                  </Wrapper>
                  <Wrapper
                    flexDirection="column"
                    flexAI="flex-start"
                    margin="40px 0 0 0"
                  >
                    <Label>
                      <Span>Meal Type</Span>
                    </Label>
                    <Dropdown
                      options={mealTypeOptions}
                      onChange={handleMealTypeChange}
                      search={search}
                    />
                  </Wrapper>
                  <Wrapper
                    flexDirection="column"
                    flexAI="flex-start"
                    margin="40px 0 0 0"
                  >
                    <Label>
                      <Span>Cuisine Type</Span>
                    </Label>
                    <Dropdown
                      options={cuisineTypeOptions}
                      onChange={handleCuisineTypeChange}
                      search={search}
                    />
                  </Wrapper>
                </SelectWrapper>
              </Form>
            </ContentWrapper>
            <ImageWrapper></ImageWrapper>
          </HeaderWrapper>

          <RecipesWrapper margin="120px 0">
            {recipes !== [] &&
              recipes.map((recipe) => {
                return <RecipeCard recipe={recipe} />;
              })}
            {/* {recipes.length !== 0 ? <div ref={loader}>load more</div> : null} */}
            <div ref={loader}></div>
          </RecipesWrapper>
          <p>{errorMessage}</p>
        </Container>
      </HeaderBg>
      <ScrollToTop />
    </>
  );
};

export default Search;
