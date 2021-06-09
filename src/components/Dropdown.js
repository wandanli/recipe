import React, { useState } from "react";
import styled from "styled-components";
import { BiUpArrow } from "react-icons/bi";

const HeaderWrapper = styled.div`
  padding: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionsWrapper = styled.div`
  padding: 5px;
  border-top: 1px solid #e5e8ec;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const ItemWrapper = styled.div`
  padding: 10px;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const Dropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(options);
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
        <BiUpArrow />
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
