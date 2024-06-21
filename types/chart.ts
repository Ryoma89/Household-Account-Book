import { ExpenseCategory, IncomeCategory } from "./category";

export type PieChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

export type BarChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWith: number;
  }[];
}

export type IncomeData = { [key in IncomeCategory]?: number };

export type ExpenseData = { [key in ExpenseCategory]?: number };