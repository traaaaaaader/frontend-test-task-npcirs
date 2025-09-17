import { useState } from "react";
import { useCitizens } from "../model/CitizensContext";
import { EDUCATION_ORDER } from "@/shared/constants";

export const CitizensTable = () => {
  const {
    citizens,
    selectedCitizen,
    setSelectedCitizen,
    filters,
    setFilters,
    total,
    page,
    setPage,
    pageSize,
    setPageSize,
  } = useCitizens();

  const [sort, setSort] = useState({ key: null, direction: "asc" });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sort.key === key && sort.direction === "asc") direction = "desc";
    setSort({ key, direction });
  };

  let sortedCitizens = [...citizens];
  if (sort.key) {
    sortedCitizens.sort((a, b) => {
      let aValue = a[sort.key];
      let bValue = b[sort.key];

      if (sort.key === "birthDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sort.key === "educationLevel") {
        aValue = EDUCATION_ORDER[aValue] || 0;
        bValue = EDUCATION_ORDER[bValue] || 0;
      }

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const renderSortArrow = (key) => {
    if (sort.key !== key) return "⇅";
    return sort.direction === "asc" ? "↑" : "↓";
  };

  const totalPages = Math.ceil(total / pageSize);

  const handlePrev = () => setPage(Math.max(1, page - 1));
  const handleNext = () => setPage(Math.min(totalPages, page + 1));

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 items-center justify-between">
        <input
          type="text"
          placeholder="Поиск по имени..."
          className="border border-default p-2 rounded bg-surface text-text focus:ring-2 focus:ring-accent focus:border-accent"
          value={filters.name || ""}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <select
          className="border border-default p-2 rounded bg-surface text-text focus:ring-2 focus:ring-accent focus:border-accent hover:bg-accent hover:bg-opacity-10 transition-colors"
          value={filters.gender || ""}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
        >
          <option value="">Пол (Все)</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        <select
          className="border border-default p-2 rounded bg-surface text-text focus:ring-2 focus:ring-accent focus:border-accent hover:bg-accent hover:bg-opacity-10 transition-colors"
          value={filters.educationLevel || ""}
          onChange={(e) => handleFilterChange("educationLevel", e.target.value)}
        >
          <option value="">Образование (Все)</option>
          <option value="Среднее">Среднее</option>
          <option value="Среднее специальное">Среднее специальное</option>
          <option value="Высшее">Высшее</option>
          <option value="Кандидат наук">Кандидат наук</option>
          <option value="Доктор наук">Доктор наук</option>
        </select>

        <div className="ml-auto flex items-center gap-2 text-text-muted">
          <span className="text-primary font-medium">Всего граждан: {total}</span>
          <select
            className="border border-default p-2 rounded bg-surface text-text focus:ring-2 focus:ring-accent focus:border-accent hover:bg-accent hover:bg-opacity-10 transition-colors"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / стр
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-auto h-[70vh] border border-default rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-surface sticky top-0 z-10">
            <tr>
              {["id", "fullName", "birthDate", "gender", "educationLevel"].map((key) => (
                <th
                  key={key}
                  className="px-3 py-2 text-left font-semibold border-b border-default cursor-pointer text-text-muted hover:text-primary transition-colors"
                  onClick={() => handleSort(key)}
                >
                  {key === "id" ? "ID" :
                   key === "fullName" ? "ФИО" :
                   key === "birthDate" ? "Дата рождения" :
                   key === "gender" ? "Пол" :
                   "Образование"} {renderSortArrow(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCitizens.map((c) => (
              <tr
                key={c.id}
                className={`cursor-pointer transition-colors ${
                  selectedCitizen?.id === c.id
                    ? "bg-primary bg-opacity-20"
                    : "odd:bg-surface even:bg-background"
                } hover:bg-accent hover:bg-opacity-10`}
                onClick={() => setSelectedCitizen(c)}
              >
                <td className="px-3 py-2 border-b border-default text-text">{c.id}</td>
                <td className="px-3 py-2 border-b border-default text-text">{c.fullName}</td>
                <td className="px-3 py-2 border-b border-default text-text">{c.birthDate}</td>
                <td className="px-3 py-2 border-b border-default text-text">{c.gender}</td>
                <td className="px-3 py-2 border-b border-default text-text">{c.educationLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
        <button
          className="px-3 py-1 border border-default rounded text-text-muted hover:bg-accent hover:bg-opacity-10 disabled:opacity-50 transition-colors"
          onClick={handlePrev}
          disabled={page === 1}
        >
          ← Назад
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num, idx, arr) => {
          if (
            num === 1 ||
            num === totalPages ||
            (num >= page - 1 && num <= page + 1)
          ) {
            return (
              <button
                key={num}
                className={`px-3 py-1 rounded border border-default transition-colors ${
                  page === num
                    ? "bg-primary text-white border-primary"
                    : "text-text hover:bg-accent hover:bg-opacity-10"
                }`}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            );
          }
        })}

        <button
          className="px-3 py-1 border border-default rounded text-text-muted hover:bg-accent hover:bg-opacity-10 disabled:opacity-50 transition-colors"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Вперед →
        </button>
      </div>
    </div>
  );
};
