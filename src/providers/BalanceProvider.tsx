import React from "react";
import { useUser } from "./UserProvider";

const BalanceContext = React.createContext<{
  currentBalance: number;
  speed: number;
} | null>(null);

export default function BalanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useUser();
  const speed = Math.floor(user?.data.production ?? 0);
  const [currentBalance, setBalance] = React.useState(() =>
    Math.floor(user?.data.balance ?? 0)
  );

  React.useEffect(() => {
    if (typeof user?.data.balance === "number") {
      setBalance(user.data.balance);
    }
  }, [user?.data.balance]);

  React.useEffect(() => {
    const id = setInterval(() => {
      setBalance((b) => b + speed);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [speed]);

  const value = React.useMemo(
    () => ({
      currentBalance,
      speed,
    }),
    [currentBalance, speed]
  );

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
}

export function useBalance() {
  const balance = React.useContext(BalanceContext);
  if (!balance) throw new Error("Use balance context within provider!");
  return balance;
}
