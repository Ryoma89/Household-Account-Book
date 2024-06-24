import React from 'react'
import PieChart from './piechart/PieChart'
import DonutChart from './donutChart/DonutChart'
import BarChart from './barChart/BarChart'

const Chart = () => {
  return (
    <section className='px-5 py-10 md:p-10'>
        <div className="sm:w-10/12 sm:mx-auto md:w-full md:mx-0">
          <div className="md:grid md:grid-cols-2 md:gap-10">
            <PieChart />
            <DonutChart />
          </div>
          <BarChart />
        </div>
      </section>
  )
}

export default Chart
