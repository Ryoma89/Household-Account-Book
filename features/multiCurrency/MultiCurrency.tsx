'use client'
import Title from '@/app/components/elements/Title'
import SelectedMonth from '@/app/components/elements/selectedMonth'
import React from 'react'
import MultiCurrencySelect from './components/multiCurrencySelect/MultiCurrencySelect'
import MultiCurrencyTable from './components/multiCurrencyTable/MultiCurrencyTable'
import useFetchTransactions from '@/hooks/useFetchTransactions'
import useProfileStore from '@/store/profileStore'

const MultiCurrency = () => {
  const { user } = useProfileStore();
  const loading = useFetchTransactions(user.id);
  return (
    <div>
      <Title title='Multi Currency' />
      <SelectedMonth />
      <MultiCurrencySelect />
      <MultiCurrencyTable />
    </div>
  )
}

export default MultiCurrency
