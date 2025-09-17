import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const BarChart = ({ data, stacked = false }) => {
  if (!data || data.length === 0) {
    return <div className="text-text-muted text-sm">Нет данных</div>;
  }

  return (
      <ResponsiveContainer width="100%" height={300}>
        <ReBarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <XAxis dataKey="label" 
            interval={0} 
            angle={-30} 
            textAnchor="end"
            tick={{ fill: "var(--color-text)" }} />
          <YAxis tick={{ fill: "var(--color-text)" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="male" stackId={stacked ? "a" : undefined} fill="#3B82F6" name="Мужчины" />
          <Bar dataKey="female" stackId={stacked ? "a" : undefined} fill="#EC4899" name="Женщины" />
        </ReBarChart>
      </ResponsiveContainer>
  );
};

