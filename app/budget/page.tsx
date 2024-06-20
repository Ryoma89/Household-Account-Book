import React from 'react'
import Nav from '../components/layout/Nav'
import Budget from '@/features/budget/Budget'

const BudgetPage = () => {
  return (
    <div>
      <Nav />
      <section className='p-5 md:p-10'>
        <Budget />
      </section>
    </div>
  )
}

export default BudgetPage
