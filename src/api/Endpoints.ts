export const Endpoints = {
  get AUTH() {
    return `/auth`;
  },
  get USER() {
    return `/user`;
  },
  get USER_STATS() {
    return `/user/stats`;
  },
  get USER_FRIENDS() {
    return `/user/friends`;
  },
  get GLOBAL_GAME_STATS() {
    return `/game/stats`;
  },
  get PERKS() {
    return `/game/perks`;
  },
  get WATCHED() {
    return `/game/watched`;
  },
  get ACHIEVEMENTS() {
    return `/game/achievements`;
  },
  get DAILY() {
    return `/game/daily`;
  },
  get SOCKET_URL() {
    return `/api/ws`;
  },
};
