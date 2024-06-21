import { TransactionType } from "@/types/transaction"

const transformData = (transactions: TransactionType[], selectedMonth: string) => {
  const filteredTransactions = transactions.filter((transaction) => transaction.date.startsWith(selectedMonth));

  const dailyData: {
    [key: string] : { Income: number; Expense: number }
  } = filteredTransactions.reduce((acc, t) => {
    if(!acc[t.date]) {
      acc[t.date] = {
        Income: 0,
        Expense: 0
      }
    }
    if(t.type === "Income" || t.type === "Expense") {
      acc[t.date][t.type as "Income" | "Expense"] += Number(t.converted_amount);
    }
    return acc;
  }, {} as { [key: string]: { Income: number; Expense: number}});

  const dates = Object.keys(dailyData).sort();
  const incomeData = dates.map(date => dailyData[date].Income)
  const expenseData = dates.map(date => dailyData[date].Expense);

  return {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: dates.map(() => "rgba(75, 192, 192, 1)"),
        borderColor: dates.map(() => "rgba(75, 192, 192, 1)"),
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: dates.map(() => "rgba(255, 99, 132, 1)"),
        borderColor: dates.map(() => "rgba(255, 99, 132, 1)"),
        borderWidth: 1,
      }
    ]
  }
}

export default transformData