import { MONTH_NAMES } from "@/shared/constants"

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

export const safeNumber = (num) => (typeof num === "number" ? num.toLocaleString("ru-RU") : "—");
export const safeString = (str) => str || "—";
export const safeArray = (arr) => (Array.isArray(arr) ? arr : []);
export const safeObject = (obj) => obj || {};
