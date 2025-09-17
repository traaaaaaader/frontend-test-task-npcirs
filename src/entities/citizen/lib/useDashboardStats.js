import { useEffect, useState } from "react";
import { 
  generateCitizens,   
  calculateAverageAge,
  calculateMonthlyGenderData,
  calculateBloodData,
  calculateIncomeStats,
  calculateEducationStats,
  calculateGenderCounts 
} from "@/entities/citizen";

export const useDashboardStats = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const citizens = generateCitizens();

      const averageAge = calculateAverageAge(citizens);
      const birthMonthGenderStats = calculateMonthlyGenderData(citizens);
      const bloodTypeDistribution = calculateBloodData(citizens);
      const { averageIncome, percentageAboveAverageIncome } = calculateIncomeStats(citizens);
      const educationDistribution = calculateEducationStats(citizens);
      const { totalMales, totalFemales } = calculateGenderCounts(citizens);

      setDashboardData({
        citizens,
        totalCitizens: citizens.length,
        averageIncome,
        percentageAboveAverageIncome,
        averageAge,
        birthMonthGenderStats,
        bloodTypeDistribution,
        educationDistribution,
        totalMales,
        totalFemales
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { dashboardData, loading };
};
