import React, { useState } from "react";
import styled from "styled-components";
import { BiUpArrow } from "react-icons/bi";

const HeaderWrapper = styled.div`
  width: 180px;
  padding: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.greyDark};
  border-radius: 10px 10px 0 0;
`;

const OptionsWrapper = styled.div`
  padding: 5px;
  border: 1px solid ${(props) => props.theme.color.greyDark};
  display: ${(props) => (props.open ? "block" : "none")};
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

const Dropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items] = useState(options);
  const [selectedItem, setSelectedItem] = useState("All");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (e) => {
    setSelectedItem(e.currentTarget.textContent);
    setIsOpen(false);
    onChange(e.currentTarget.textContent);
  };

  return (
    <div>
      <HeaderWrapper onClick={toggleDropdown}>
        {selectedItem}
        <StyledBiUpArrow open={isOpen ? true : false} />
      </HeaderWrapper>
      <OptionsWrapper open={isOpen ? true : false}>
        {items.map((item) => (
          <ItemWrapper onClick={(e) => handleItemClick(e)}>{item}</ItemWrapper>
        ))}
      </OptionsWrapper>
    </div>
  );
};

export default Dropdown;
