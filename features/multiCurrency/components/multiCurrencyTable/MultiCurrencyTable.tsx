'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { columns } from './columns';
import useCurrencyStore from '@/store/useCurrencyStore';
import useTransactionStore from '@/store/transactionStore';
import useProfileStore from '@/store/profileStore';
import useMonthStore from '@/store/selectedMonth';
import fetchExchangeRates from '../../utils/fetchExchangeRates';

interface DataItem {
  currency: string;
  income: number;
  expense: number;
  balance: number;
}

const MultiCurrencyTable = () => {
  const { transactions, fetchTransactions } = useTransactionStore();
  const { user } = useProfileStore();
  const { filteredCurrencies, exchangeRates, setExchangeRates } = useCurrencyStore();
  const { selectedMonth } = useMonthStore();
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (user.id) {
      fetchTransactions(user.id);
    }
  }, [user.id, fetchTransactions]);

  useEffect(() => {
    const fetchAndSetRates = async () => {
      if (transactions.length > 0) {
        const uniqueDates = Array.from(new Set(transactions.map((t) => t.date)));
        for (const date of uniqueDates) {
          const rates = await fetchExchangeRates(date);
          setExchangeRates(date, rates);
        }
      }
    };
    fetchAndSetRates();
  }, [transactions, setExchangeRates]);

  const calculateTotals = (currency: string) => {
    let totalIncome = 0;
    let totalExpense = 0;

    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction !== null &&
        transaction !== undefined &&
        transaction.date.startsWith(selectedMonth)
    );

    filteredTransactions.forEach((transaction) => {
      const date = transaction.date;
      const rates = exchangeRates[date];
      if (rates) {
        const rate = rates[transaction.currency];
        if (rate) {
          const convertedAmount = transaction.amount / rate;
          const currencyRate = rates[currency];
          if (currencyRate) {
            const finalAmount = convertedAmount * currencyRate;

            if (transaction.type.toLowerCase() === "income") {
              totalIncome += finalAmount;
            } else if (transaction.type.toLowerCase() === "expense") {
              totalExpense += finalAmount;
            }
          } else {
            console.warn(`No rate found for currency ${currency} on date ${date}`);
          }
        } else {
          console.warn(`No rate found for currency ${transaction.currency} on date ${date}`);
        }
      } else {
        console.warn(`No rates found for date ${date}`);
      }
    });

    return {
      currency,
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    };
  };

  useEffect(() => {
    if (filteredCurrencies.length > 0 && transactions.length > 0) {
      const newData = filteredCurrencies.map(currency => calculateTotals(currency));
      setData(newData);
    }
  }, [filteredCurrencies, exchangeRates, transactions, selectedMonth]);

  return (
    <div className="mt-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MultiCurrencyTable;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { DataTable } from './DataTable';
// import { columns } from './columns';
// import useCurrencyStore from '@/store/useCurrencyStore';
// import useTransactionStore from '@/store/transactionStore';
// import useMonthStore from '@/store/selectedMonth';
// import useProfileStore from '@/store/profileStore';
// import { fetchExchangeRates } from '../../utils/fetchExchangeRates';

// interface DataItem {
//   currency: string;
//   income: number;
//   expense: number;
//   balance: number;
// }

// const MultiCurrencyTable = () => {
//   const { transactions, fetchTransactions } = useTransactionStore();
//   const { user } = useProfileStore();
//   const { exchangeRates, setExchangeRates } = useCurrencyStore();
//   const { selectedMonth } = useMonthStore();
//   const { filteredCurrencies } = useCurrencyStore();

//   const [data, setData] = useState<DataItem[]>([]);

//   useEffect(() => {
//     if (user.id) {
//       fetchTransactions(user.id);
//     }
//   }, [user.id, fetchTransactions]);

//   useEffect(() => {
//     if (transactions.length > 0) {
//       const uniqueDates = Array.from(new Set(transactions.map((t) => t.date)));
//       uniqueDates.forEach(async (date) => {
//         const rates = await fetchExchangeRates(date);
//         setExchangeRates(date, rates);
//       });
//     }
//   }, [transactions]);

//   const calculateTotals = (currency: string) => {
//     let totalIncome = 0;
//     let totalExpense = 0;

//     const filteredTransactions = transactions.filter(transaction =>
//       transaction !== null && transaction !== undefined &&
//       transaction.date.startsWith(selectedMonth)
//     );

//     filteredTransactions.forEach((transaction) => {
//       const date = transaction.date;
//       const rates = exchangeRates[date];
//       if (rates) {
//         const rate = rates[transaction.currency];
//         if (rate) {
//           const convertedAmount = transaction.amount / rate;
//           const currencyRate = rates[currency];
//           if (currencyRate) {
//             const finalAmount = convertedAmount * currencyRate;

//             if (transaction.type.toLowerCase() === 'income') {
//               totalIncome += finalAmount;
//             } else if (transaction.type.toLowerCase() === 'expense') {
//               totalExpense += finalAmount;
//             }
//           } else {
//             console.warn(`No rate found for currency ${currency} on date ${date}`);
//           }
//         } else {
//           console.warn(`No rate found for currency ${transaction.currency} on date ${date}`);
//         }
//       } else {
//         console.warn(`No rates found for date ${date}`);
//       }
//     });

//     return {
//       currency,
//       income: totalIncome,
//       expense: totalExpense,
//       balance: totalIncome - totalExpense
//     };
//   };

//   useEffect(() => {
//     const newData = filteredCurrencies.map(currency => calculateTotals(currency));
//     setData(newData);
//   }, [filteredCurrencies, exchangeRates, transactions]);

//   return (
//     <div className="mt-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };

// export default MultiCurrencyTable;
