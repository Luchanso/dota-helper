import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { runDotaClient } from "./dota2.js";
import { getSteamIDs } from "./server-log-reader.js";

const app = express();

var server = app.listen(3001, () => {
  console.log("Dota 2 GSI listening on port " + server.address().port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client = runDotaClient(app);

app.get("/time", (req, res) => {
  res.json(client.gameState);
});

app.get("/steam-ids", async (req, res) => {
  res.json(await getSteamIDs());
});
