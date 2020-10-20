import { heroes } from "dotaconstants";

export const getLast10HeroMatches = (matches) => {
  return matches.reduce((prev, { hero_id }, index) => {
    if (index > 10) {
      return prev;
    }
    return [...prev, heroes[hero_id].localized_name];
  }, []);
};
