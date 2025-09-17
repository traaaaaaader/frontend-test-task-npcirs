import { useState, useMemo } from "react";
import { Card, BarChart, PieChart } from "@/shared/ui";
import { MONTH_NAMES } from "@/shared/constants";

export const DashboardCharts = ({ birthMonthGenderStats, bloodTypeDistribution }) => {
  const [selectedGender, setSelectedGender] = useState("all");

  const barData = useMemo(() => {
    return birthMonthGenderStats.map((item, index) => {
      if (selectedGender === "male") return { label: MONTH_NAMES[index], male: item.male, female: 0 };
      if (selectedGender === "female") return { label: MONTH_NAMES[index], male: 0, female: item.female };
      return { label: MONTH_NAMES[index], male: item.male, female: item.female };
    });
  }, [birthMonthGenderStats, selectedGender]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card
        title="Статистика по месяцам рождения"
        headerAction={
          <select
            className="text-sm border border-default rounded px-2 py-1 bg-surface text-text"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="male">Мужчины</option>
            <option value="female">Женщины</option>
          </select>
        }
      >
        <BarChart data={barData} height={250} stacked />
      </Card>

      <Card title="Распределение по группе крови">
        <PieChart data={bloodTypeDistribution} />
      </Card>
    </div>
  );
};
