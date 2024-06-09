"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shield } from 'lucide-react'
import { Spinner } from '@/components/custom/spinner'
import { findByDocument } from '@/api/users/users.api'
import { useRouter } from 'next/navigation'

export const AssistanceCheck = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [onValueChange, setOnValueChange] = useState<string>("")

  const router = useRouter()
  
  const handleSubmit = async () => {
    setIsLoading(true)
    console.log(onValueChange)
    await findByDocument(onValueChange)
    setIsLoading(false)
    console.log("hola")
  }

  return (
    <div className='flex flex-col items-center justify-center px-10 py-10 gap-8 border-2 rounded-md min-w-2/5 w-fit'>
      <Button 
        className='flex flex-row gap-2 items-center w-full justify-start' 
        variant={"link"} 
        disabled={isLoading}
        onClick={() => router.push("/dashboard")}
      >
        <span className='text-base font-semibold text-primary'>Panel Administrativo</span>
        <Shield size={16} color='hsl(var(--primary))'/>
      </Button>
      <span className='text-2xl font-semibold'>Ingrese su cedula de identidad</span>
      <Input 
        placeholder='Cedula de Identidad'
        className='py-6 text-lg border-2'
        type='number'
        disabled={isLoading}
        onChange={(e) => setOnValueChange(e.target.value)}
      />
      <div className='flex flex-row gap-2 items-center justify-between w-full'>
        <Button 
          className='w-full text-xl py-7' 
          onClick={handleSubmit}
          disabled={ isLoading || onValueChange.length < 7 }
        >
          { isLoading ? <Spinner size='large'/> : "Entrada" }
        </Button>
        <Button 
          className='bg-red-500 hover:bg-red-500/90 w-full text-xl py-7' 
          onClick={handleSubmit}
          disabled={ isLoading || onValueChange.length < 7 }
        >
          { isLoading ? <Spinner size='large'/> : "Salida" }
        </Button>
      </div>
    </div>
  )
}
