import React from "react";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";
import { MaxWidthBreakpoints } from "../style/globalStyle";

const StyledLink = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 3rem;
  color: ${(props) => props.theme.color.greyDark};
  /* @media ${MaxWidthBreakpoints.small} {
    font-size: 2.6rem;
  } ; */
`;

const StyledDiv = styled.div`
  position: absolute;
  top: 0px;
  left: -20px;
  width: 100vw;
  height: 50px;
`;

const GithubLink = () => {
  return (
    <StyledDiv>
      <StyledLink target="_blank" href="https://github.com/wandanli/recipe.git">
        <FaGithub />
      </StyledLink>
    </StyledDiv>
  );
};

export default GithubLink;
