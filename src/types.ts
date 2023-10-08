import { ATTRIBUTE_LIST, CLASS_LIST } from "./consts";

export type CharacterClass = keyof typeof CLASS_LIST;
export type AttributesKeys = (typeof ATTRIBUTE_LIST)[number];

export type Attributes = {
  [key in AttributesKeys]: number;
};
