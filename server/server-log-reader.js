import fs from "fs";

// const state = {
//   steamIds: [],
//   serverLogPath: "",
// };

const DEFAULT_FILE =
  "C:\\Program Files (x86)\\Steam\\steamapps\\common\\dota 2 beta\\game\\dota\\server_log.txt";

const getDotaIdsFromLine = (line) => {
  let playersRegex = /\d:(\[U:\d:(\d+)])/g;
  let playersMatch;
  let dotaIds = [];
  while ((playersMatch = playersRegex.exec(line))) {
    dotaIds.push(playersMatch[2]);
  }
  return dotaIds;
};

// const onChange = (eventType, fileName) => {
//   fs.readFile(fileName, (err, data) => updateState(data));
// };

// export const run = (
//   serverLogPath = DEFAULT_FILE
// ) => {
//   state.serverLogPath = serverLogPath;
//   onChange("init", state.serverLogPath);
//   fs.watch(state.serverLogPath).addListener("change", onChange);
// };

const getState = () => {
  return new Promise((res) => {
    fs.readFile(DEFAULT_FILE, (err, data) => {
      const rowString = data.toString();
      const startIndex = rowString.lastIndexOf("Lobby");
      const finishIndex = rowString.indexOf("\n", startIndex);
      const lobbyString = rowString.slice(startIndex, finishIndex);

      res(getDotaIdsFromLine(lobbyString));
    });
  });
};

// const updateState = (rowData) => {
//   const rowString = rowData.toString();
//   const startIndex = rowString.lastIndexOf("Lobby");
//   const finishIndex = rowString.indexOf("\n", startIndex);
//   const lobbyString = rowString.slice(startIndex, finishIndex);

//   state.steamIds = getDotaIdsFromLine(lobbyString);
// };

export const getSteamIDs = () => {
  return getState();
};

// if (process.env.DEBUG_MODULE) {
//   run();
// }
