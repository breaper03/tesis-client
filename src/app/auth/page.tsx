import React from 'react'
import { NavBar } from '../components/nav-bar'
import Form from './components/styled-form'
import Image from 'next/image'

export default function AuthPage() {
  return (
  <div className="flex flex-col h-screen bg-background">
      <NavBar /> 
      <div className="flex-grow flex items-center md:gap-28 justify-center p-3">
        <div className='sm:hidden md:flex'>
          <Image
            src="/imgLogin.png"
            width={400}
            height={300}
            alt="Image Login"
        />
        </div>
        
        <Form />
      </div>
    </div>
  )
}
