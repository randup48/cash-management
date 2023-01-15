import { Expense } from "./models/expense";
const key = "DATA_EXPENSE";

export const setLocalStorage = (value: Expense[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
