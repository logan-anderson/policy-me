import { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";

type Keys = (typeof ATTRIBUTE_LIST)[number];

type Attributes = {
  [key in Keys]?: number;
};

export function useAttributes() {
  const [attributes, setAttributes] = useState({} as Attributes);
  const updateAttribute = (attribute: Keys, value: number) => {
    setAttributes((prev) => ({ ...prev, [attribute]: value }));
  };
  return [attributes, updateAttribute] as const;
}
