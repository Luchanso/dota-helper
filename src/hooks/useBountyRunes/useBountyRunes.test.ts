import {
  isNeedToPlay,
  ALARM_BEFORE,
  BOUNTY_RUNE_INTERVAL,
} from "./useBountyRunes";

describe("useBountyRunes", () => {
  it("should be not play on start", () => {
    expect(isNeedToPlay(0, -1)).toBe(false);
    expect(isNeedToPlay(1, -1)).toBe(false);
  });

  it("should be not play before ALARM_BEFORE", () => {
    expect(isNeedToPlay(ALARM_BEFORE - 1, -1)).toBe(false);
  });

  it("should be play", () => {
    expect(isNeedToPlay(ALARM_BEFORE + 1, -1)).toBe(true);
    expect(isNeedToPlay(BOUNTY_RUNE_INTERVAL + ALARM_BEFORE, 1)).toBe(true);
    expect(isNeedToPlay(BOUNTY_RUNE_INTERVAL + ALARM_BEFORE + 1, 1)).toBe(true);
  });

  it("should be not play before next interval", () => {
    expect(isNeedToPlay(ALARM_BEFORE - 1, 1)).toBe(false);
  });
});
