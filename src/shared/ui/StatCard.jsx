import { Card } from "./Card";

export const StatCard = ({ title, value, trend, trendValue, icon, iconBg = "bg-primary", iconColor = "text-white" }) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center text-xl`}>
              {icon}
            </div>
            <div>
              <p className="text-sm text-text-muted font-medium">{title}</p>
              <h3 className="text-2xl font-bold text-text mt-1">{value}</h3>
            </div>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-success text-white' : 
            trend === 'down' ? 'bg-error text-white' : 
            'bg-surface text-text'
          }`}>
            <span>{trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
