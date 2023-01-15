import { convertEpoch } from "./format_date";
import { Category, Expense, FilterCategoryExpense } from "./models/expense";

export const category: Category[] = [
  {
    id: "1",
    value: "Primary",
  },
  {
    id: "2",
    value: "Unexpected",
  },
  {
    id: "3",
    value: "Hobies / Lifestyle",
  },
  {
    id: "4",
    value: "Education",
  },
];

export const filterMonthYear = (
  dataLocal: Expense[],
  selectedDate: number
): Expense[] => {
  return dataLocal.filter(
    (dataExpanse) =>
      convertEpoch(dataExpanse.date) === convertEpoch(selectedDate ?? 0)
  );
};

export const filterByCategory = (
  dataFiltered: Expense[]
): FilterCategoryExpense | null => {
  return dataFiltered.length
    ? {
        primary: dataFiltered.filter((data) => data.category === "1"),
        unexpected: dataFiltered.filter((data) => data.category === "2"),
        hobies: dataFiltered.filter((data) => data.category === "3"),
        education: dataFiltered.filter((data) => data.category === "4"),
      }
    : null;
};
