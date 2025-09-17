import { useMemo } from "react";
import { Card } from "@/shared/ui"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { calculateFinesByMonthAndType } from "@/entities/citizen";

const COLORS = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-error)",
  "var(--color-warning)",
  "var(--color-accent)",
  "var(--color-secondary)",
];

export const DashboardLineChart = ({ citizens }) => {
  const { data, fineTypes } = useMemo(
    () => calculateFinesByMonthAndType(citizens),
    [citizens]
  );

  if (!data || data.length === 0) {
    return <div className="text-text-muted text-sm">Нет данных по штрафам</div>;
  }

  return (
    <Card title="Распределение по группе крови">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
          <XAxis dataKey="month" tick={{ fill: "var(--color-text)" }} />
          <YAxis tick={{ fill: "var(--color-text)" }} />
          <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
          <Legend />
          {fineTypes.map((type, index) => (
            <Line
              key={type}
              type="monotone"
              dataKey={type}
              name={type}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
