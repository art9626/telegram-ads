import UserStats from "../components/UserStats/UserStats.tsx";
import WithBackButton from "../components/ui/WithBackButton/WithBackButton.tsx";

export default function UserStatsPage() {
  return (
    <WithBackButton to="/">
      <UserStats />
    </WithBackButton>
  );
}
