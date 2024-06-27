import React from 'react'

const Dashboard = () => {
  return (
    <section className='px-5 py-12 bg-HomeBg sm:px-10'>
      <h2 className="text-2xl text-center font-bold sm:text-3xl">Dashboard</h2>
      <div className='mt-5 sm:mt-8 sm:grid sm:grid-cols-2 sm:items-center sm:grid-flow-row-dense'>
        <p className='sm:order-2'>Convert all your transactions into your primary currency for a clear financial overview, easily manage your transactions, and access a detailed list to stay on top of your finances.</p>
        <div className='max-h-[200px] w-[200px] mx-auto sm:order-1'>
          <img src="/money.png" alt="money" className='max-h-[200px] w-[200px]'/>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
