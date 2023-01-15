export interface Expense {
  id: string;
  date: number;
  category: string;
  amount: number;
  desc: string;
}

export interface Category {
  id: string;
  value: string;
}

export interface FilterCategoryExpense {
  primary: Expense[];
  unexpected: Expense[];
  hobies: Expense[];
  education: Expense[];
}
