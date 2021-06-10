import React, { Fragment, useEffect, useState } from "react";
import { FloatingButton } from "../style/globalStyle";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      {isVisible && (
        <FloatingButton onClick={scrollToTop}>
          <BiArrowToTop />
        </FloatingButton>
      )}
    </Fragment>
  );
};

export default ScrollToTop;
