import styled, { css, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    font-size: 62.5%; /* 16px * 62.5% = 10px -> 1rem = 10px */
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 0;
}
body {
  font-family: ${(props) => props.theme.fontFamily.paragraph};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  line-height: 1.3;
  color: ${(props) => props.theme.color.black};
}
`;

export const Container = styled.div`
  display: ${(props) => (props.hide ? "none" : "")};
  width: 100%;
  max-width: calc(1100px + 24px + 24px);
  min-width: 280px;
  margin: 0 auto;
  padding: ${(props) => props.padding || "24px 24px 24px 24px"};
`;

export const Wrapper = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  flex-direction: ${(props) => props.flexDirection || "row"};
  flex-wrap: ${(props) => props.flexWrap || "wrap"};
  justify-content: ${(props) => props.flexJC || "center"};
  align-items: ${(props) => props.flexAI || "center"};
  width: ${(props) => props.width || ""};
  margin: ${(props) => props.margin || ""};
`;

export const FullScreenWrapper = styled(Wrapper)`
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

export const Heading = styled.h1`
  margin: ${(props) => props.margin || ""};
  text-transform: capitalize;
  font-family: ${(props) => props.theme.fontFamily.heading};
  font-weight: bolder;
  ${(props) =>
    props.primary &&
    css`
      color: ${(props) => props.theme.color.primary};
    `};
  ${(props) =>
    props.secondary &&
    css`
      color: ${(props) => props.theme.color.secondary};
    `};
  ${(props) =>
    props.h1 &&
    css`
      font-size: 3.2rem;
      @media ${MaxWidthBreakpoints.small} {
        font-size: 2.08rem;
      } ;
    `};
  ${(props) =>
    props.h2 &&
    css`
      font-size: 2.4rem;
    `};
  ${(props) =>
    props.h3 &&
    css`
      font-size: 2.08rem;
    `};
  ${(props) =>
    props.h4 &&
    css`
      font-size: 1.6rem;
    `};
  ${(props) =>
    props.h5 &&
    css`
      font-size: 1.28rem;
    `};
  ${(props) =>
    props.h6 &&
    css`
      font-size: 1.12rem;
    `};
`;

export const Emoji = styled.span.attrs((props) => ({
  role: "img",
  // "aria-label": props.ariaLabel,
}))``;

export const Paragraph = styled.p`
  margin: ${(props) => props.margin || ""};
  text-align: ${(props) => props.textAlign || "center"};
  ${(props) =>
    props.large &&
    css`
      font-size: 1.8rem;
    `};
  ${(props) =>
    props.small &&
    css`
      font-size: 1.4rem;
    `};
`;

export const Button = styled.button`
  background: none;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
  }
`;

export const MinWidthBreakpoints = {
  small: `(min-width: 480px)`,
  medium: `(min-width: 930px)`,
  large: `(min-width: 1140px)`,
  xLarge: `(min-width: 1500px)`,
};

export const MaxWidthBreakpoints = {
  small: `(max-width: 479px)`,
  medium: `(max-width: 850px)`,
  large: `(max-width: 1139px)`,
  xLarge: `(max-width: 1499px)`,
};

export const Image = styled.img`
  object-fit: cover;
  object-position: center center;
  @media ${MaxWidthBreakpoints.small} {
    width: 240px;
    height: 240px;
  } ;
`;

export const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 40px;
  width: 60px;
  height: 60px;
  padding-top: 8px;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 30px;
  text-align: center;
  font-size: 4rem;
  color: ${(props) => props.theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  @media ${MaxWidthBreakpoints.small} {
    right: 20px;
    width: 40px;
    height: 40px;
    padding-top: 4px;
    font-size: 3rem;
  } ;
`;

export default GlobalStyle;
