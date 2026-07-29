'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, LayoutDashboard, BarChart3, Users, Settings, LogOut } from 'lucide-react'
import { NavbarProps, SidebarItems } from '@/types'
import { usePathname } from 'next/navigation'
import { sidebarMenuItems } from '../_config/sidebarMenuItems'
import { Button } from '@/components/ui/button'
import { logout } from '@/service/logout'


export default function DashboardSidebar({user}:NavbarProps) {


    const [isOpen, setIsOpen] = useState(true);

    // const pathname = usePathname();



    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }


        let menuItems: SidebarItems[] = [];

        if(user?.data?.myProfile?.role === "TENANT"){
            menuItems = sidebarMenuItems.TENANT
        }
        if(user?.data?.myProfile?.role === "ADMIN"){
            menuItems = sidebarMenuItems.ADMIN
        }
        if(user?.data?.myProfile?.role === "LANDLORD"){
            menuItems = sidebarMenuItems.LANDLORD
        }

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-40 h-screen bg-primary text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-700 px-4 py-6">
                    {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
                    <button
                        onClick={toggleSidebar}
                        className="rounded-lg p-2 hover:bg-primary-foreground hover:text-accent-foreground transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-2 px-3 py-6">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-accent-foreground"
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {isOpen && <span>{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700 p-3">
                    <Button onClick={()=>logout()} className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
                        <LogOut size={20} className="flex-shrink-0" />
                        {isOpen && <span>Logout</span>}
                    </Button>
                </div>
            </aside>

            {/* Content Wrapper */}
            <div
                className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}
            >
                {/* Toggle Button for Mobile */}
                <button
                    onClick={toggleSidebar}
                    className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
        </>
    )
}
