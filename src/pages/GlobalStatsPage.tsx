import GlobalStats from "../components/GlobalStats/GameInfo.tsx";
import WithBackButton from "../components/ui/WithBackButton/WithBackButton.tsx";

export default function GlobalStatsPage() {
  return (
    <WithBackButton to="/">
      <GlobalStats />
    </WithBackButton>
  );
}
