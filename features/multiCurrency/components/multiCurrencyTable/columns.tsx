"use client"

import { getCurrencySymbol } from "@/constants/currencies";
import { multiCurrency } from "@/types/multiCurrency"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<multiCurrency>[] = [
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "income",
    header: "Income",
    cell: ({ row }) => {
      const currency = row.original.currency;
      return `${getCurrencySymbol(currency)}${row.original.income.toFixed(2)}`;
    },
  },
  {
    accessorKey: "expense",
    header: "Expense",
    cell: ({ row }) => {
      const currency = row.original.currency;
      return `${getCurrencySymbol(currency)}${row.original.expense.toFixed(2)}`;
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const currency = row.original.currency;
      return `${getCurrencySymbol(currency)}${row.original.balance.toFixed(2)}`;
    },
  },
]
