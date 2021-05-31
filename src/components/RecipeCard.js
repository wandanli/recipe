import React from "react";
import styled from "styled-components";
import fallbackImg from "../images/fallbackImg.png";

import {
  Wrapper,
  Paragraph,
  Image,
  Heading,
  MaxWidthBreakpoints,
} from "../style/globalStyle";

const StyledWrapper = styled(Wrapper)`
  position: relative;
  height: 480px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
  background-position: bottom;
  background-repeat: no-repeat;
  @media ${MaxWidthBreakpoints.small} {
    height: 420px;
  } ;
`;

const StyledImage = styled(Image)`
  border-radius: 10px 10px 0 0;
  box-shadow: rgba(6, 180, 154, 0.4) 0px 5px, rgba(6, 180, 154, 0.3) 0px 10px,
    rgba(6, 180, 154, 0.2) 0px 15px, rgba(6, 180, 154, 0.1) 0px 20px,
    rgba(6, 180, 154, 0.05) 0px 25px;
`;

const RecipeCard = ({ recipe }) => {
  return (
    <StyledWrapper
      margin="40px 20px"
      flexDirection="column"
      flexAI="flex-start"
      flexJC="flex-start"
    >
      <StyledImage
        width="300"
        height="300"
        alt={recipe["recipe"]["label"]}
        src={recipe["recipe"]["image"]}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
      ></StyledImage>
      <Wrapper margin="20px 20px" flexDirection="column" flexAI="flex-start">
        <Heading h4 margin="0 0 16px 0">
          {recipe["recipe"]["label"]}
        </Heading>
        <Paragraph margin="0 0 8px 0">
          Cautions: {recipe["recipe"]["cautions"].join(", ")}
        </Paragraph>
        <Paragraph margin="0 0 8px 0">
          Calories: {recipe["recipe"]["calories"].toFixed(2)}
        </Paragraph>
        <Paragraph margin="0 0 8px 0">
          Total Time: {recipe["recipe"]["totalTime"]}
        </Paragraph>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={recipe["recipe"]["shareAs"]}
        >
          Learn More
        </a>
      </Wrapper>
    </StyledWrapper>
  );
};

export default RecipeCard;
