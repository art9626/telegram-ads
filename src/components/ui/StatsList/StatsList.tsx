import s from "./statsList.module.css";

export default function StatsList({
  stats,
}: {
  stats: Array<{ title: string; value?: string | number }>;
}) {
  return (
    <dl className={s.statsList}>
      {stats.map(({ title, value }) => (
        <div key={title} className={s.statsItem}>
          <dt>{title}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
