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
    <section className='px-5 py-10 md:p-10'>
      <Title title="Budget" />
      <BudgetInput />
      <SelectedMonth />
      <BudgetCards />
    </section>
  )
}

export default Budget
