import React from 'react'
import Nav from '../components/layout/Nav'
import MultiCurrency from '@/features/multiCurrency/MultiCurrency'

const CurrencyPage = () => {
  return (
    <div>
      <Nav />
      <section className='p-5 md:p-10'>
        <MultiCurrency />
      </section>
    </div>
  )
}

export default CurrencyPage
