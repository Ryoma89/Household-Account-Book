import { PieChartData } from "@/types/chart";
import { TransactionType } from "@/types/transaction";

const transformData = (transactions: TransactionType[], selectedMonth: string): PieChartData => {
  const filteredTransactions = transactions.filter((transaction) => transaction.date.startsWith(selectedMonth));

  const income = filteredTransactions.filter((transaction) => transaction.type === "Income").reduce((acc, t) => acc + Number(t.converted_amount), 0);

  const expense = filteredTransactions.filter((transaction) => transaction.type === "Expense").reduce((acc, t) => acc + Number(t.converted_amount), 0);

  return {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Income vs Expense',
      data: [income, expense],
      backgroundColor: ['rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)',],
      borderColor: ['rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)',],
      borderWidth: 1,
      }
    ]
  }
};
export default transformData