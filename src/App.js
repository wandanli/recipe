import React from "react";
import Search from "./components/Search";

import GlobalStyle from "./style/globalStyle";
import Theme from "./style/theme";

function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Search />
    </Theme>
  );
}

export default App;
