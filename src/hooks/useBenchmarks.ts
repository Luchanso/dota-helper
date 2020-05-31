import { State, Benchmarks } from "../state/state";
import { useEffect, useState, useCallback } from "react";
import { heroIdSelector } from "../state/state-selector";

const BENCHMARKS_URL = "https://api.opendota.com/api/benchmarks"; // ?hero_id=66

export function useBenchmarks(state: State): State {
  const [localState, setLocalState] = useState<Benchmarks>();

  const updateBenchmarksForHero = useCallback(
    async function (id: number) {
      try {
        const response = await fetch(`${BENCHMARKS_URL}?hero_id=${id}`);
        const benchmarks = (await response.json()) as Benchmarks;

        setLocalState(benchmarks);
      } catch (error) {
        setLocalState({
          error,
        });
      }
    },
    [setLocalState]
  );

  useEffect(() => {
    const heroId = heroIdSelector(state);
    const benchmarksHeroId = localState?.hero_id;

    if (heroId && heroId !== benchmarksHeroId && !localState?.error) {
      updateBenchmarksForHero(heroId);
    }
  }, [state, localState, updateBenchmarksForHero]);

  return { ...state, benchmarks: localState };
}
