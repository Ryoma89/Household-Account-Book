'use client'
import Title from '@/app/components/elements/Title'
import React from 'react'
import BudgetInput from './BudgetInput'
import SelectedMonth from '@/app/components/elements/selectedMonth'
import BudgetCards from './BudgetCards'
import useProfileStore from '@/store/profileStore'
import useFetchTransactions from '@/hooks/useFetchTransactions'
import Loading from '@/app/components/elements/Loading'

const Budget = () => {
  const { user } = useProfileStore();

  const loading = useFetchTransactions(user?.id);

  if (loading) {
    return (
      <div className="px-5 py-7">
        <Title title="Budget" />
        <Loading />
      </div>
    )
  }
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
