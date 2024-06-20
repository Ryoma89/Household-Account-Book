'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useMonthStore from '@/store/selectedMonth'
import { generateMonths } from '@/utils/getMonths'
import React from 'react'

const SelectedMonth = () => {
  const { selectedMonth, setSelectedMonth } = useMonthStore()

  const months = generateMonths();
  return (
    <div className='flex justify-center items-center mb-5 mt-10'>
      <Select onValueChange={(value) => setSelectedMonth(value)} value={selectedMonth}>
        <SelectTrigger className="max-w-[180px]">
          <SelectValue>{selectedMonth}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month} value={month}>{month}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectedMonth
