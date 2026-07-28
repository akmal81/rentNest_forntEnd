import React from 'react'
import { Toaster } from 'sonner'

export default function AuthGroupLayout({children}:{children:React.ReactNode}) {
  return (
    <main>
        {children}
        <Toaster position='bottom-right' richColors></Toaster>
    </main>
  )
}
