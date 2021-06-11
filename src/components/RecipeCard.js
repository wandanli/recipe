import React from "react";
import styled from "styled-components";
import fallbackImg from "../images/fallbackImg.png";
import { GrMap } from "react-icons/gr";
import { RiTempHotLine } from "react-icons/ri";
import { BiTimeFive } from "react-icons/bi";
import {
  Wrapper,
  Paragraph,
  Image,
  Heading,
  MaxWidthBreakpoints,
} from "../style/globalStyle";

const StyledWrapper = styled(Wrapper)`
  position: relative;
  height: 500px;
  width: 300px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 10px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  background-position: bottom;
  background-repeat: no-repeat;
  @media (max-width: 330px) {
    height: 540px;
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;

const StyledImage = styled(Image)`
  margin: 10px auto;
  border-radius: 10px;
  /* clip-path: circle(70% at 50% 30%); */
  /* border: 1px solid black; */
  @media ${MaxWidthBreakpoints.small} {
    width: 92%;
  }
`;

const StyledLink = styled.a`
  display: block;
  position: absolute;
  bottom: 20px;
  padding: 8px 20px;
  background-color: ${(props) => props.theme.color.lightGreen};
  border-radius: 20px;
  opacity: 0.8;
  color: ${(props) => props.theme.color.white};
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  :hover {
    opacity: 1;
  }
`;

const TextWrapper = styled(Wrapper)``;

const SpanHeading = styled.span`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 65%, #d6e8c0 65%);
  /* display: inline !important; */
`;

const Span = styled.span`
  margin: 0 4px;
  color: ${(props) => props.theme.color.lightGreen};
  > svg > path {
    stroke: ${(props) => props.theme.color.lightGreen};
  }
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
        width="280"
        height="220"
        alt={recipe["recipe"]["label"]}
        src={recipe["recipe"]["image"]}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
      ></StyledImage>
      <TextWrapper
        margin="20px 20px"
        flexDirection="column"
        flexAI="flex-start"
      >
        <Heading h3 margin="0 0 16px 0">
          <SpanHeading>{recipe["recipe"]["label"]}</SpanHeading>
        </Heading>
        <Paragraph margin="0 0 8px 0" textAlign="left">
          <Span>
            <GrMap />
          </Span>
          <b>Cautions:</b>&nbsp;&nbsp;
          {recipe["recipe"]["cautions"].join(", ")}
        </Paragraph>
        <Paragraph margin="0 0 8px 0" textAlign="left">
          <Span>
            <RiTempHotLine />
          </Span>
          <b>Calories:</b>&nbsp;&nbsp;{recipe["recipe"]["calories"].toFixed(2)}{" "}
          kcal
        </Paragraph>
        <Paragraph margin="0 0 8px 0" textAlign="left">
          <Span>
            <BiTimeFive />
          </Span>
          <b>Total Time:</b>&nbsp;&nbsp;{recipe["recipe"]["totalTime"]} min
        </Paragraph>
        <StyledLink
          target="_blank"
          rel="noopener noreferrer"
          href={recipe["recipe"]["shareAs"]}
        >
          Learn More
        </StyledLink>
      </TextWrapper>
    </StyledWrapper>
  );
};

export default RecipeCard;
