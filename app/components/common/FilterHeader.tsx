'use client';

import React, { useState, useContext, createContext, ReactNode } from 'react';
import styled, { css } from 'styled-components';

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
  ${({ theme, $isActive }) =>
    $isActive
      ? css`
          color: ${theme.color.label.normal};
          border-bottom: 2px solid ${theme.color.primary.normal};
        `
      : css`
          color: ${theme.color.interaction.inactive};
          font-weight: 400;
        `}

  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

const FilterHeaderContext = createContext<FilterHeaderContext | null>(null);

const FilterHeader = ({ defaultIdx, children }: Props) => {
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

FilterHeader.Menu = Menu;

export default FilterHeader;
