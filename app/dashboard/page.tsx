import React from 'react'
import Nav from '../components/layout/Nav'
import Transaction from '@/features/dashboard/transaction/Transaction'

const DashboardPage = () => {
  return (
    <div>
      <Nav />
      <Transaction />
    </div>
  )
}

export default DashboardPage
