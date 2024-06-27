import React from "react";

const MultiCurrency = () => {
  return (
    <section className="px-5 py-12 sm:px-10">
      <h2 className="text-2xl text-center font-bold sm:text-3xl">Multi Currency</h2>
      <div className="sm:grid sm:grid-cols-2 sm:items-center sm:mt-8">
          <p className="mt-5 sm:mt-0">
            Our unique feature supports multiple currencies, allowing you to
            view your income, expenses, and balance in the currency of your
            choice. With automatic exchange rate updates, you always have
            accurate financial information at your fingertips.
          </p>
        <div className="max-h-[200px] w-[200px] mx-auto">
          <img
            src="/multi.png"
            alt="multi currency"
            className="max-h-[200px] w-[200px]"
          />
        </div>
      </div>
    </section>
  );
};

export default MultiCurrency;
