import { DashboardStats,
  DashboardCharts,
  DashboardEducation,
  DashboardCitizens,
  DashboardLineChart 
} from "@/widgets/dashboard";

import { useDashboardStats } from "@/entities/citizen";

export const DashboardPage = () => {
  const { dashboardData, loading } = useDashboardStats();

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-text mb-2">Загрузка данных</h2>
          <p className="text-text-muted">Пожалуйста, подождите...</p>
        </div>
      </div>
    );
  }

  const educationChartData = Object.entries(dashboardData.educationDistribution)
    .map(([label, value]) => ({ label, value }));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardStats
          total={dashboardData.totalCitizens}
          avgAge={dashboardData.averageAge}
          avgIncome={dashboardData.averageIncome}
          percentAboveAvgIncome={dashboardData.percentageAboveAverageIncome} 
        />

        <DashboardCharts
          birthMonthGenderStats={dashboardData.birthMonthGenderStats}
          bloodTypeDistribution={dashboardData.bloodTypeDistribution} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardEducation 
            educationStats={educationChartData} 
            totalCitizens={dashboardData.totalCitizens} 
          />

          <DashboardCitizens
            totalCitizens={dashboardData.totalCitizens}
            totalMales={dashboardData.totalMales}
            totalFemales={dashboardData.totalFemales}
            educationDistribution={dashboardData.educationDistribution} 
          />

          <DashboardLineChart citizens={dashboardData.citizens} />
        </div>
      </div>
    </div>
  );
};
