import Nav from "@/app/components/layout/Nav";
import React from "react";
import Transaction from "./transaction/Transaction";
import BalanceSheet from "./BalanceSheet/BalanceSheet";
import DashboardTable from "./dashboardList/DashboardTable";

const Dashboard = () => {
  return (
    <section className="px-5 py-10 md:p-10">
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
    </section>
  );
};

export default Dashboard;
