import { useState } from "react";
import { Attributes, AttributesKeys } from "../types";

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
  const updateAttribute = (attribute: AttributesKeys, value: number) => {
    setAttributes((prev) => ({ ...prev, [attribute]: value }));
  };
  return [attributes, updateAttribute] as const;
}
