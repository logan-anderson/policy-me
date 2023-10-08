import { useState } from "react";
import { SKILLS } from "../consts";
import { Skills, SkillKeys } from "../types";

export const useSkills = () => {
  /***
   * Makes an object that looks like
   * {
   *  Acrobatics: 0,
   *  Animal Handling: 0,
   *  // ...
   * }
   */
  const initial: Skills = SKILLS.reduce((acc, skill) => {
    acc[skill] = 0;
    return acc;
  }, {} as Skills);

  const [skills, setSkills] = useState(initial);
  const updateSkills = (attribute: SkillKeys, value: number) => {
    setSkills((prev) => ({ ...prev, [attribute]: value }));
  };
  return [skills, updateSkills] as const;
};
