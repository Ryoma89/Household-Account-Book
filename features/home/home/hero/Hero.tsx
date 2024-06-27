import React from 'react'

const Hero = () => {
  return (
    <section>
        <div className="px-5 py-14 sm:grid sm:grid-cols-2 sm:items-center sm:py-8 sm:px-10">
          <div className="text-center md:flex md:flex-col md:justify-center">
            <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">MoneyMate</h2>
            <p className="text-lg  mt-5 font-semibold md:text-xl lg:text-2xl xl:text-3xl">
              Your Best Partner in Household Budgeting
            </p>
          </div>
          <div className="hidden sm:block">
            <img src="/home.png" alt="" className="h-full" />
          </div>
        </div>
      </section>
  )
}

export default Hero
