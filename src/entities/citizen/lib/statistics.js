import { MONTH_NAMES, EDUCATION_ORDER } from "@/shared/constants";

export const calculateAverageAge = (citizens) => {
  if (!citizens.length) return 0;
  const today = new Date();
  const avg = citizens.reduce((sum, c) => {
    const birth = new Date(c.birthDate);
    return sum + (today.getFullYear() - birth.getFullYear());
  }, 0) / citizens.length;
  return Math.round(avg);
};

export const calculateMonthlyGenderData = (citizens) => {
  const data = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, male: 0, female: 0 }));
  citizens.forEach(c => {
    const month = new Date(c.birthDate).getMonth();
    data[month][c.gender]++;
  });
  return data;
};

export const calculateBloodData = (citizens) => {
  const byBloodType = citizens.reduce((acc, c) => {
    acc[c.health.bloodType] = (acc[c.health.bloodType] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(byBloodType).map(([label, value]) => ({ label, value }));
};

export const calculateIncomeStats = (citizens) => {
  if (!citizens.length) return { averageIncome: 0, percentageAboveAverageIncome: 0 };
  const averageIncome = Math.round(citizens.reduce((sum, c) => sum + c.income, 0) / citizens.length);
  const percentageAboveAverageIncome = Math.round(
    (citizens.filter(c => c.income > averageIncome).length / citizens.length) * 100
  );
  return { averageIncome, percentageAboveAverageIncome };
};

export const calculateEducationStats = (citizens) => {
  return citizens.reduce((acc, c) => {
    const educations = c.education?.map(e => e.degree);
    const highest = educations.reduce((best, cur) =>
      EDUCATION_ORDER[cur] > EDUCATION_ORDER[best] ? cur : best
    , educations[0]);
    acc[highest] = (acc[highest] || 0) + 1;
    return acc;
  }, {});
};

export const calculateGenderCounts = (citizens) => ({
  totalMales: citizens.filter(c => c.gender === "male").length,
  totalFemales: citizens.filter(c => c.gender === "female").length,
});

export const calculateFinesByMonthAndType = (citizens) => {
  const map = {};
  const fineTypes = new Set();

  citizens.forEach((citizen) => {
    citizen.fines.forEach((fine) => {
      const date = new Date(fine.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!map[monthKey]) {
        map[monthKey] = {
          monthKey,
          month: `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`,
        };
      }

      map[monthKey][fine.type] = (map[monthKey][fine.type] || 0) + fine.amount;

      fineTypes.add(fine.type);
    });
  });

  return {
    data: Object.values(map).sort(
      (a, b) => new Date(a.monthKey) - new Date(b.monthKey)
    ),
    fineTypes: Array.from(fineTypes),
  };
};
