import { ATTRIBUTE_LIST } from "./consts";

export type AttributesKeys = (typeof ATTRIBUTE_LIST)[number];

export type Attributes = {
  [key in AttributesKeys]: number;
};
