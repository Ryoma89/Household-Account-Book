import React from "react";

const Chart = () => {
  return (
    <section className="px-5 py-12 bg-HomeBg sm:px-10">
      <h2 className="text-2xl text-center font-bold sm:text-3xl">Chart</h2>
      <div className="mt-5 sm:mt-8 sm:grid sm:grid-cols-2 sm:items-center sm:grid-flow-row-dense">
        <p className="sm:order-2">Visualize your income and expenses by category to gain better financial insights and make more informed budgeting decisions.</p>
        <div className="max-h-[200px] w-[200px] mx-auto sm:order-1">
          <img
            src="/chart.png"
            alt="chart"
            className="max-h-[200px] w-[200px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Chart;
