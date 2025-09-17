// DashboardEducation.jsx
import { Card } from "@/shared/ui";

export const DashboardEducation = ({ educationStats, totalCitizens }) => {
  const colors = ["bg-primary", "bg-success", "bg-accent", "bg-warning", "bg-error"];

  return (
    <Card title="Уровень образования">
      <div className="space-y-4">
        {educationStats.map((item, index) => {
          const percentage = ((item.value / totalCitizens) * 100).toFixed(1);
          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text">{item.label}</span>
                <span className="text-text-muted">{percentage}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[index]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
