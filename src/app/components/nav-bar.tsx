import React from 'react'
import { ThemeSwitch } from '../../components/custom/theme-switch';

export const NavBar = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full px-10 py-3 border-b'>
      <span className='text-2xl font-semibold'>Title Here!!</span>
      <ThemeSwitch />
    </div>
  )
}
