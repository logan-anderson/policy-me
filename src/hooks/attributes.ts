import { useState } from "react";
import { Attributes, AttributesKeys } from "../types";

export function useAttributes() {
  const initial: Attributes = {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 9,
  };
  const [attributes, setAttributes] = useState<Attributes>(initial);
  const updateAttribute = (attribute: AttributesKeys, value: number) => {
    setAttributes((prev) => ({ ...prev, [attribute]: value }));
  };
  return [attributes, updateAttribute] as const;
}
