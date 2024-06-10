import React from 'react'
import { NavBar } from '../components/nav-bar'
import Form from './components/styled-form'

export default function AuthPage() {
  return (
  <div className="flex flex-col h-screen bg-background">
      <NavBar />
      <div className="flex-grow flex items-center justify-center p-3">
        <Form />
      </div>
    </div>
  )
}
