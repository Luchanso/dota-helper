import { heroes } from "dotaconstants";

/**
 *
 * @param {[{hero_id: number, duration: number, deaths: number, kills: number, assists: number}]} matches
 * @returns {{topHeroes:[{heroId: string, wins: number}], kills: number, deaths: number, assists: number, duration: number}}
 */
export const getHeroesStats = (matches) => {
  const result = matches.reduce(
    (prev, { assists, deaths, duration, hero_id, kills }) => {
      return {
        heroMap: {
          ...prev.heroMap,
          [hero_id]: (prev.heroMap[hero_id] || 0) + 1,
        },
        kills: prev.kills + kills,
        assists: prev.assists + assists,
        deaths: prev.deaths + deaths,
        durations: prev.durations + duration,
      };
    },
    { heroMap: {}, kills: 0, deaths: 0, assists: 0, durations: 0 }
  );

  const topHeroes = Object.entries(result.heroMap)
    .sort(([, playsA], [, playsB]) => {
      if (playsA < playsB) {
        return 1;
      }
      if (playsA > playsB) {
        return -1;
      }

      return 0;
    })
    .slice(0, 3)
    .map(([heroId, plays]) => ({ name: heroes[heroId].localized_name, plays }));

  return {
    topHeroes,
    kills: (result.kills / matches.length).toFixed(2),
    deaths: (result.deaths / matches.length).toFixed(2),
    assists: (result.assists / matches.length).toFixed(2),
    duration: (result.durations / matches.length / 60).toFixed(1) + " mins",
  };
};
