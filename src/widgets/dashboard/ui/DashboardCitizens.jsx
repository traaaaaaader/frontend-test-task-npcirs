import { Card } from "@/shared/ui";

export const DashboardCitizens = ({
  totalCitizens,
  totalMales,
  totalFemales,
  educationDistribution}) => {
  return (
    <Card title="Статистика граждан">
      <div className="space-y-4">
        <div className="text-center">
          <div className="font-bold text-success mb-1">
            {totalCitizens}
          </div>
          <div className="text-sm text-text-muted">Всего граждан</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-muted">Мужчины</span>
            <span className="text-sm font-medium text-blue-600">{totalMales}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-muted">Женщины</span>
            <span className="text-sm font-medium text-pink-600">{totalFemales}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">
            Образование
          </h4>
          <div className="space-y-1">
            {Object.entries(educationDistribution).map(([level, count]) => (
              <div key={level} className="flex justify-between text-sm">
                <span className="text-text">{level}</span>
                <span className="text-text-muted">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

