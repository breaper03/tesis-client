import React from 'react'
import { NavBar } from '../components/nav-bar'
import { UsersTable } from './components/users-table';

export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-2 items-center justify-start w-full h-screen bg-background">
      <div className="flex w-full h-fit items-center">
        <NavBar />
      </div>
      <div className='flex items-center justify-center w-full h-full px-10'>
        <UsersTable />
      </div>
    </div>
  )
}


