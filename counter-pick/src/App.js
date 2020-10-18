import React, { useEffect, useState } from "react";
import "./App.css";
import { getHeroesStats } from "./getHeroesStats";
import { getWinrateStats } from "./getWinrateStats";

const sleep = (time) =>
  new Promise((res) => {
    setTimeout(res, time);
  });

function getProfile(matches) {
  const winrateStats = getWinrateStats(matches);
  const heroStats = getHeroesStats(matches);

  return {
    ...winrateStats,
    ...heroStats,
  };
}

const formUrl = (id) =>
  `https://api.opendota.com/api/players/${id}/matches?significant=0&date=30&project=assists&project=duration&project=start_time&project=hero_id&project=start_time&project=kills&project=deaths&project=item_0&project=item_1&project=item_2&project=item_3&project=item_4&project=item_5&project=backpack_0`;

function App() {
  const [profiles, setProfiles] = useState();

  const handleBan = (id) => {
    let banlist = JSON.parse(localStorage.getItem("banlistIds")) || [];
    banlist.push(id);
    banlist = banlist.filter((item) => !(item === null || item === undefined));
    localStorage.setItem("banlistIds", JSON.stringify(banlist));
  };

  useEffect(() => {
    async function fetchIds() {
      const ids = await (await fetch("http://localhost:3001/steam-ids")).json();
      const banlistIds = JSON.parse(localStorage.getItem("banlistIds")) || [];
      const filteredIds = ids.filter((id) => !banlistIds.includes(id));
      const state = [];

      for (let i = 0; i < filteredIds.length; i++) {
        const matches = await (await fetch(formUrl(filteredIds[i]))).json();
        // debugger;
        if (matches.length > 0) {
          state.push({
            id: filteredIds[i],
            ...getProfile(matches),
          });
        } else {
          handleBan(filteredIds[i]);
        }

        await sleep(100);
      }

      setProfiles(state);
    }

    fetchIds();
  }, []);

  return (
    <div className="App">
      {profiles &&
        profiles.length &&
        profiles.map((profile) => (
          <div>
            <a
              href={`https://www.dotabuff.com/players/${profile.id}/matches?date=month&enhance=overview`}
              target="_blank"
            >
              Dotabuff profile
            </a>
            <br />
            <br />
            <br />
            <button onClick={() => handleBan(profile.id)}>Ban this id</button>
            <pre key={profile.id}>{JSON.stringify(profile, null, 4)}</pre>
          </div>
        ))}
    </div>
  );
}

export default App;
