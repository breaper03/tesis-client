"use client"

import { useEffect, useState } from "react"
import { Jersey_10 as FontSans, Jersey_10 } from "next/font/google"
import { format } from "@formkit/tempo"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const fontSans = FontSans({
  weight: ["400"],
  variable: "--font-sans",
  subsets: ["latin"],
})

export const LiveHour = () => {
  const [hour, setHour] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

<<<<<<< .merge_file_1YR1VQ
  const formattedDateTime = format(hour, "h:mm a", "es") 
=======
  const formattedTime = hour.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
>>>>>>> .merge_file_SIJ9Sd

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <span className={cn("font-sans antialiased text-9xl text-primary", fontSans.variable)}>
<<<<<<< .merge_file_1YR1VQ
        {formattedDateTime}
=======
        {formattedTime}
>>>>>>> .merge_file_SIJ9Sd
      </span>
      <Progress value={(hour.getSeconds() / 60) * 100} />
    </div>
  )
}