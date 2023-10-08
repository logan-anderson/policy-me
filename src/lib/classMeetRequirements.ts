import { CLASS_LIST, ATTRIBUTE_LIST } from "../consts";
import { Attributes } from "../types";

type CharacterClass = keyof typeof CLASS_LIST;

// This function will take in a class and return true of the requirements are met
export const classMeetRequirements = (
  characterClass: CharacterClass,
  attributes: Attributes
) => {
  // Get the requirements for the class
  const requirements = CLASS_LIST[characterClass];
  // Get the keys of the attributes
  const attributeKeys = Object.keys(requirements) as Array<keyof Attributes>;
  let isValid = true;
  attributeKeys.forEach((key) => {
    // does the character have the required attribute?
    if (attributes[key] < requirements[key]) {
      isValid = false;
    }
  });
  return isValid;
};
