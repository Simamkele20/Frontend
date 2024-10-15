export interface Platform {
  id: number;
  name: string;
}

export interface GameModes {
  id: number;
  name: string;
}

export interface ReleaseDate {
  id: number;
  human: string;
}
export interface Websites {
  id: number;
  url: string;
}

export interface Game {
  id: number;
  name: string;
  summary: string;
  release_dates?: ReleaseDate[];
  cover?: {
    url: string;
  };
  genres?: { id: number; name: string }[];
  platforms?: Platform[];
  game_modes?: GameModes[];
  websites: Websites[];
}

export interface GameResponse {
  status: number;
  data: {
    name: string;
    result: Game[];
  }[];
}

export interface GameByIdResponse {
  status: number;
  data: Array<{
    result: Game[];
  }>;
}
