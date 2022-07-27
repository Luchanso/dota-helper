function isWinMatch(playerSlot, radiantWin) {
  if (playerSlot < 100 && radiantWin) {
    return true;
  }
  if (playerSlot > 100 && !radiantWin) {
    return true;
  }

  return false;
}
export const getWinrateStats = (matches) => {
  const result = matches.reduce(
    (prev, { player_slot, radiant_win }) => {
      if (isWinMatch(player_slot, radiant_win)) {
        return {
          ...prev,
          win: prev.win + 1,
        };
      }

      return {
        ...prev,
        lose: prev.lose + 1,
      };
    },
    { win: 0, lose: 0 }
  );

  return {
    ...result,
    winRate: (result.win / (result.lose + result.win)).toFixed(2),
  };
};
