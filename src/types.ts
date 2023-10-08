import { ATTRIBUTE_LIST, CLASS_LIST, SKILLS } from "./consts";

export type CharacterClass = keyof typeof CLASS_LIST;
export type AttributesKeys = (typeof ATTRIBUTE_LIST)[number];
export type SkillKeys = (typeof SKILLS)[number];
export type Skills = {
  [key in SkillKeys]: number;
};

export type Attributes = {
  [key in AttributesKeys]: number;
};
