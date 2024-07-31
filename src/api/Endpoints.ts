export const Endpoints = {
  // PROD_URL: "https://game.botsquad.win",
  PROD_URL:"http://localhost:8000",
  get BASE_URL() {
    return `${this.PROD_URL}/api/v1`;
  },
  get SOCKET_URL() {
    return `${this.PROD_URL}/api/ws`;
  },
  get AUTH() {
    return `${this.BASE_URL}/auth`;
  },
  get USER() {
    return `${this.BASE_URL}/user`;
  },
  get USER_STATS() {
    return `${this.BASE_URL}/user/stats`;
  },
  get USER_FRIENDS() {
    return `${this.BASE_URL}/user/friends`;
  },
  get GLOBAL_GAME_STATS() {
    return `${this.BASE_URL}/game/stats`;
  },
  get PERKS() {
    return `${this.BASE_URL}/game/perks`;
  },
  get WATCHED() {
    return `${this.BASE_URL}/game/watched`;
  },
  get ACHIEVEMENTS() {
    return `${this.BASE_URL}/game/achievements`;
  },
  get DAILY() {
    return `${this.BASE_URL}/game/daily`;
  }
};
