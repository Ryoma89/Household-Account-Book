import React from "react";
import Nav from "../components/layout/Nav";
import Transaction from "@/features/dashboard/transaction/Transaction";
import BalanceSheet from "@/features/dashboard/BalanceSheet/BalanceSheet";
import DashboardList from "@/features/dashboard/dashboardList/DashboardList";
import DashboardTable from "@/features/dashboard/dashboardList/DashboardTable";

const DashboardPage = () => {
  return (
    <div>
      <Nav />
      <div className="p-5 md:p-10">
        <div className="md:grid md:grid-cols-2 md:grid-flow-row-dense gap-5">
        <div className="sm:order-2">
            <Transaction />
          </div>
          <div className="sm:order-1">
            <BalanceSheet />
          </div>
        </div>
        {/* <DashboardList /> */}
        <DashboardTable />
      </div>
    </div>
  );
};

export default DashboardPage;
