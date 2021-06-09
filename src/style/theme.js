import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    primary: "#55b56a",
    secondary: "#e4544f",
    greyLight: "#F2F2F2",
    greyDark: "#c2c2c2",
    black: "#121721",
    white: "#ffff",
    lightGreen: "#8ec13f",
    orange: "#f7ba4a",
  },
  fontFamily: {
    heading: "Lato, sans-serif",
    paragraph: "Lato, sans-serif",
  },
  fontSize: {
    small: "1.4rem",
    medium: "1.6rem",
    large: "1.8rem",
    xLarge: "2rem",
  },
  fontWeight: {
    light: 100,
    normal: 400,
    bold: 700,
    bolder: 900,
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
