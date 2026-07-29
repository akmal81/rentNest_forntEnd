import { Navbar } from '@/components/shared/Navbar'
import { getMe } from '@/service/getMe'
import React from 'react'
import { Toaster } from 'sonner'

export default async function AuthGroupLayout({ children }: { children: React.ReactNode }) {

  const user = await getMe()
  return (
    <div>
      <Navbar user={user} />
      {children}
      <Toaster position='bottom-right' richColors></Toaster>
    </div>
  )
}
