import React from "react";

const Budget = () => {
  return (
    <section className="px-5 py-12 sm:px-10">
      <h2 className="text-2xl text-center font-bold sm:text-3xl">Budget</h2>
      <div className="mt-5 sm:grid sm:grid-cols-2 sm:items-center sm:mt-8">
        <p>Add new budgets to streamline household management, monitor your spending habits, and ensure effective financial planning.</p>
        <div className="max-h-[200px] w-[200px] mx-auto">
          <img
            src="/budget.png"
            alt="money"
            className="max-h-[200px] w-[200px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Budget;
