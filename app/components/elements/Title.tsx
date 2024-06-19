import React from 'react'

const Title = ({title}: {title: string}) => {
  return (
    <div className='text-center text-4xl text-extrabold'>
      <span className='border-b-2 border-accentColor'>
        {title}
      </span>
    </div>
  )
}

export default Title
