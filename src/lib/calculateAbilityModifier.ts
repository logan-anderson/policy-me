// This function takes in a score and returns the modifier for that score.
export const calculateAbilityModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};
