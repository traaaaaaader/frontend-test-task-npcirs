import { StatCard } from "@/shared/ui";

export const DashboardStats = ({ total, avgAge, avgIncome, percentAboveAvgIncome }) => {
  const statsConfig = [
    { title: "Всего записей", value: total?.toLocaleString("ru-RU") || "0", icon: "👥", iconBg: "bg-primary" },
    { title: "Средний возраст", value: `${avgAge || 0} лет`, icon: "📊", iconBg: "bg-success" },
    {
      title: "Средний доход",
      value: `${avgIncome.toLocaleString("ru-RU")} Р`,
      trend: "up",
      trendValue: `${percentAboveAvgIncome} %`,
      icon: "📈",
      iconBg: "bg-accent",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsConfig.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
