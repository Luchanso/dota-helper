export type Buildings = any;

export type Draft = any;

export type Provider = {
  name: "Dota 2";
  appid: number;
  version: number;
  timestamp: number;
};

export type Map = {
  name: string;
  matchid: string;
  game_time?: number;
  clock_time?: number;
  daytime: boolean;
  nightstalker_night: boolean;
  game_state: string;
  paused: boolean;
  win_team: string;
  customgamename: string;
  ward_purchase_cooldown: number;
};

export type Player = {
  steamid: string;
  name: string;
  activity: string;
  kills: number;
  deaths: number;
  assists: number;
  last_hits: number;
  denies: number;
  kill_streak: number;
  commands_issued: number;
  kill_list: any;
  team_name: string;
  gold: number;
  gold_reliable: number;
  gold_unreliable: number;
  gold_from_hero_kills: number;
  gold_from_creep_kills: number;
  gold_from_income: number;
  gold_from_shared: number;
  gpm: number;
  xpm: number;
};

export type Hero = {
  xpos: number;
  ypos: number;
  id: number;
  name: string;
  level: number;
  alive: boolean;
  respawn_seconds: number;
  buyback_cost: number;
  buyback_cooldown: number;
  health: number;
  max_health: number;
  health_percent: number;
  mana: number;
  max_mana: number;
  mana_percent: number;
  silenced: Boolean;
  stunned: Boolean;
  disarmed: Boolean;
  magicimmune: Boolean;
  hexed: Boolean;
  muted: Boolean;
  break: Boolean;
  smoked: Boolean;
  has_debuff: Boolean;
  talent_1: Boolean;
  talent_2: Boolean;
  talent_3: Boolean;
  talent_4: Boolean;
  talent_5: Boolean;
  talent_6: Boolean;
  talent_7: Boolean;
  talent_8: Boolean;
};

export type Items = {
  [key: string]: {
    name: string;
  };
};

export type Wearables = {
  wearable0: number;
  wearable1: number;
  wearable2: number;
  wearable3: number;
  wearable4: number;
  [key: string]: number;
};

export type Ability = {
  name: string;
  level: number;
  can_cast: boolean;
  passive: boolean;
  ability_active: boolean;
  cooldown: number;
  ultimate: boolean;
};

export type Abilities = {
  [key: string]: Ability;
};

export type GameState = {
  buildings: Buildings;
  provider: Provider;
  map?: Map;
  player?: Player;
  hero: Hero;
  abilities: Abilities;
  items: Items;
  draft: Draft;
  wearables: Wearables;
  previously?: GameState;
};

export type Percentile =
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 0.95
  | 0.99;

export type Bench = {
  percentile?: Percentile;
  value: number;
};

export type BenchmarksResult = {
  gold_per_min?: Bench[];
  hero_damage_per_min?: Bench[];
  hero_healing_per_min?: Bench[];
  kills_per_min?: Bench[];
  last_hits_per_min?: Bench[];
  lhten?: Bench[];
  stuns_per_min?: Bench[];
  tower_damage?: Bench[];
  xp_per_min?: Bench[];
};

export type Benchmarks = {
  hero_id?: number;
  result?: BenchmarksResult;
  error?: any;
};

export type State = {
  ip?: string;
  gamestate?: GameState;
  benchmarks?: Benchmarks;
};
