import { heroes } from "dotaconstants";

export const getLast10HeroMatches = (matches) => {
  const games = matches.reduce((prev, { hero_id }, index) => {
    if (index > 10) {
      return prev;
    }
    return [...prev, heroes[hero_id].localized_name];
  }, []);
  return {
    games,
    lastGameDate: new Date(matches[0].start_time * 1000).toLocaleDateString(),
  };
};
