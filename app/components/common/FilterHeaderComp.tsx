'use client';

import { useState } from 'react';
import styled from 'styled-components';

export type filter = { text: string; value: string | number };

interface Props {
  filterList: filter[];
  onChange: (filter: filter) => void;
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

const FilterHeaderComp = (props: Props) => {
  const { filterList, onChange } = props;

  const [value, setValue] = useState(filterList[0].value);

  const handleClick = (v: filter) => {
    setValue(v.value);
    onChange(v);
  };

  return (
    <FilterUl>
      {filterList.map((v, idx) => (
        <FilterLi key={idx} onClick={() => handleClick(v)} $active={v.value === value}>
          {v.text}
        </FilterLi>
      ))}
    </FilterUl>
  );
};

export default FilterHeaderComp;
