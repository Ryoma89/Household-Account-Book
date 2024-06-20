import Title from '@/app/components/elements/Title'
import React from 'react'
import BudgetInput from './BudgetInput'
import SelectedMonth from '@/app/components/elements/selectedMonth'
import BudgetCards from './BudgetCards'

const Budget = () => {
  return (
    <div>
      <Title title="Budget" />
      <BudgetInput />
      <SelectedMonth />
      <BudgetCards />
    </div>
  )
}

export default Budget
