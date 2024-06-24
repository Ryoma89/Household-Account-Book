import React from "react";
import Nav from "../components/layout/Nav";
import Transaction from "@/features/dashboard/transaction/Transaction";
import BalanceSheet from "@/features/dashboard/BalanceSheet/BalanceSheet";
import DashboardTable from "@/features/dashboard/dashboardList/DashboardTable";
import Dashboard from "@/features/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <div>
      <Nav />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
