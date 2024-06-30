declare global {
  // window.Telegram.WebApp.initDataUnsafe.user.id;
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user: {
            id: number;
          };
        };
      };
    };
  }
}
