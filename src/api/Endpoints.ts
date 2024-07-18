export const Endpoints = {
  PROD_URL: "https://game.botsquad.win",
  // PROD_URL:"http://localhost:8000",
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
    return `${this.BASE_URL}/game/user`;
  },
  get GAME_INFO() {
    return `${this.BASE_URL}/game/info`;
  },
  get FRIENDS() {
    return `${this.BASE_URL}/game/user/friends`;
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
};
