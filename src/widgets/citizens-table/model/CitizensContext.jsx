import { createContext, useContext, useState, useEffect } from "react";
import { generateCitizens } from "@/entities/citizen";

const CitizensContext = createContext();

export const CitizensProvider = ({ children, defaultPageSize = 50 }) => {
  const [allCitizens, setAllCitizens] = useState([]);
  const [citizens, setCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = generateCitizens(1000);
    setAllCitizens(data);
  }, []);

  useEffect(() => {
    let filtered = allCitizens;

    if (filters.name) {
      filtered = filtered.filter((c) =>
        c.fullName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.gender) {
      filtered = filtered.filter((c) => c.gender === filters.gender);
    }
    if (filters.educationLevel) {
      filtered = filtered.filter((c) => c.educationLevel === filters.educationLevel);
    }

    setTotal(filtered.length);

    const totalPages = Math.ceil(filtered.length / pageSize);
    const currentPage = Math.min(page, totalPages) || 1;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setCitizens(filtered.slice(start, end));
  }, [allCitizens, filters, page, pageSize]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const updatePageSize = (size) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <CitizensContext.Provider
      value={{
        citizens,
        selectedCitizen,
        setSelectedCitizen,
        filters,
        setFilters: updateFilters,
        page,
        setPage,
        pageSize,
        setPageSize: updatePageSize,
        total,
      }}
    >
      {children}
    </CitizensContext.Provider>
  );
};

export const useCitizens = () => useContext(CitizensContext);
