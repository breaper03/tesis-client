"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export const AssistanceCheck = () => {

  const handleSubmit = async () => {
    console.log("hola")
  }

  return (
    <div className='flex flex-col items-center justify-center px-4 py-8 gap-4 border-2 rounded-md w-1/2'>
      <span className='text-2xl font-semibold'>Ingrese su cedula de identidad</span>
      <Input 
        placeholder='Cedula de Identidad'
        className='py-6 text-lg border-2'
      />
      <div className='flex flex-row gap-2 items-center justify-between w-full'>
        <Button className='w-full text-xl py-7' onClick={handleSubmit}>Entrada</Button>
        <Button className='bg-red-500 hover:bg-red-500/90 w-full text-xl py-7' onClick={handleSubmit}>Salida</Button>
      </div>
    </div>
  )
}
