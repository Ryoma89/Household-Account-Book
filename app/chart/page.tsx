import React from "react";
import Nav from "../components/layout/Nav";
import PieChart from "@/features/chart/piechart/PieChart";
import DonutChart from "@/features/chart/donutChart/DonutChart";
import BarChart from "@/features/chart/barChart/BarChart";

const ChartPage = () => {
  return (
    <div>
      <Nav />
      <section>
        <div className="sm:w-10/12 sm:mx-auto md:w-full md:mx-0">
          <div className="md:grid md:grid-cols-2">
            <PieChart />
            <DonutChart />
          </div>
          <BarChart />
        </div>
      </section>
    </div>
  );
};

export default ChartPage;
