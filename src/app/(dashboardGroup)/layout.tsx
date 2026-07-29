import { Navbar } from '@/components/shared/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar';
import { getMe } from '@/service/getMe'
import React from 'react'
import DashboardSidebar from './_components/DashboardSidebar';

export default async function Dashboardlayout(
    { children }: { children: React.ReactNode }
) {

    const user = await getMe()
    console.log(user);
    return (
        <div>

            {/* <Navbar user={user} /> */}
            <SidebarProvider>
                <DashboardSidebar user={user} />
                {children}
            </SidebarProvider>
        </div>
    )
}
