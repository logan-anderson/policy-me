import { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";

type Keys = (typeof ATTRIBUTE_LIST)[number];

type Attributes = {
  [key in Keys]: number;
};

export function useAttributes() {
  const initial: Attributes = {
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  };
  const [attributes, setAttributes] = useState<Attributes>(initial);
  const updateAttribute = (attribute: Keys, value: number) => {
    setAttributes((prev) => ({ ...prev, [attribute]: value }));
  };
  return [attributes, updateAttribute] as const;
}
