import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiUpArrow } from "react-icons/bi";
import { MaxWidthBreakpoints } from "../style/globalStyle";

const HeaderWrapper = styled.div`
  padding: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.greyDark};
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => props.theme.color.white};
`;

const OptionsWrapper = styled.div`
  padding: 5px;
  border: 1px solid ${(props) => props.theme.color.greyDark};
  border-top: 0px;
  display: ${(props) => (props.open ? "block" : "none")};
  background-color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.fontSize.small};
`;

const ItemWrapper = styled.div`
  padding: 10px;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.greyLight};
  }
`;

const StyledBiUpArrow = styled(BiUpArrow)`
  transform: ${(props) => (props.open ? "rotateX(180deg)" : "rotateX(0)")};
  transition: all 0.4s ease-in-out;
`;

const Span = styled.span`
  padding-right: 10px;
`;

const Div = styled.div`
  width: 180px;
  @media ${MaxWidthBreakpoints.small} {
    width: 100%;
  }
`;

const Dropdown = ({ options, onChange, search }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items] = useState(options);
  const [selectedItem, setSelectedItem] = useState("All");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (e) => {
    setSelectedItem(e.currentTarget.textContent);
    setIsOpen(false);
    onChange(e.currentTarget.textContent);
  };

  useEffect(() => {
    if (search === "") {
      setSelectedItem("All");
    }
  }, [search]);

  return (
    <Div>
      <HeaderWrapper onClick={toggleDropdown}>
        <Span>{selectedItem}</Span>
        <StyledBiUpArrow open={isOpen ? true : false} />
      </HeaderWrapper>
      <OptionsWrapper open={isOpen ? true : false}>
        {items.map((item) => (
          <ItemWrapper onClick={(e) => handleItemClick(e)}>{item}</ItemWrapper>
        ))}
      </OptionsWrapper>
    </Div>
  );
};

export default Dropdown;
