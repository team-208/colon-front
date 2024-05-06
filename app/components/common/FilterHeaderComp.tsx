'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

export type filterType = { text: string; value: string | number };

interface Props {
  filterList: filterType[];
  onChange: (filter: filterType) => void;
}

const FilterUl = styled.ul`
  width: 100%;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.line.solid.normal};
`;

const FilterLi = styled.li<{ $active: boolean }>`
  display: inline-block;
  cursor: pointer;
  padding: 5px 16.5px;
  ${({ theme }) => theme.font.body3}
  color: ${({ theme, $active }) =>
    $active ? theme.color.label.normal : theme.color.interaction.inactive};
  ${({ theme, $active }) => $active && `border-bottom: 2px solid ${theme.color.primary.normal};`}

  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

const FilterHeaderComp = ({ filterList, onChange }: Props) => {
  const [curFilter, setCurFilter] = useState(filterList[0]);

  const handleClick = (v: filterType) => {
    setCurFilter(v);
    onChange(v);
  };

  return (
    <FilterUl>
      {filterList.map((v, idx) => (
        <FilterLi key={idx} onClick={() => handleClick(v)} $active={v.value === curFilter.value}>
          {v.text}
        </FilterLi>
      ))}
    </FilterUl>
  );
};

export default React.memo(FilterHeaderComp);
