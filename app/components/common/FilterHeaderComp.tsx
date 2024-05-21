'use client';

import React, { useState, useContext, createContext, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  defaultIdx?: number;
  children: ReactNode;
}

interface MenuProps {
  idx: number;
  text: string;
  clickEvent: (idx: number) => void;
}

interface FilterHeaderContext {
  curIdx: number;
  setCurIdx: React.Dispatch<React.SetStateAction<number>>;
}

const FilterUl = styled.ul`
  width: 100%;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.line.solid.normal};
`;

const FilterLi = styled.li<{ $isActive: boolean }>`
  display: inline-block;
  cursor: pointer;
  padding: 5px 16.5px;
  ${({ theme }) => theme.font.body3}
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.label.normal : theme.color.interaction.inactive};
  ${({ theme, $isActive }) =>
    $isActive && `border-bottom: 2px solid ${theme.color.primary.normal};`}

  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

const FilterHeaderContext = createContext<FilterHeaderContext | null>(null);

const FilterHeaderComp = ({ defaultIdx, children }: Props) => {
  const [curIdx, setCurIdx] = useState(defaultIdx ?? 0);

  const provider = { curIdx, setCurIdx };

  return (
    <FilterHeaderContext.Provider value={provider}>
      <FilterUl>{children}</FilterUl>
    </FilterHeaderContext.Provider>
  );
};

const Menu = ({ idx, text, clickEvent }: MenuProps) => {
  const context = useContext(FilterHeaderContext);
  const isActive = context?.curIdx === idx;

  return (
    <FilterLi
      key={`filter-${idx}`}
      onClick={() => {
        context?.setCurIdx(idx);
        clickEvent(idx);
      }}
      $isActive={isActive}
    >
      {text}
    </FilterLi>
  );
};

FilterHeaderComp.Menu = Menu;

export default FilterHeaderComp;
