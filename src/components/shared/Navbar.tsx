"use client"

import * as React from "react"
import Link from "next/link"
// import { User, Menu, X, MapPin, LogOut, Settings, LayoutDashboard, UserCheck } from "lucide-react"
import { User, Menu as MenuIcon, X, MapPin, LogOut, Settings, LayoutDashboard, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavbarProps } from "@/types"
import { logout } from "@/service/logout"



export function Navbar({ user }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)



    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "Properties", href: "/properties" },
        { name: "RENT", href: "/rent" },
        { name: "ABOUT", href: "/about" },
        { name: "CONTACT", href: "/contact" },
    ]


    const getInitials = (name?: string) => {
        if (!name) return "RN"
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    let dashboardUrl = "/dashboard/tenant";

    if (user?.data?.myProfile.role === 'ADMIN') {
        dashboardUrl = "/dashboard/admin"
    } else if (user?.data?.myProfile.role === 'LANDLORD') {
        dashboardUrl = "/dashboard/landlord"

    } else {
        dashboardUrl = "/dashboard/tenant"
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">

                {/*  Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
                        <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight">
                        <span>Rent</span><span className="text-primary">-Nest</span>
                    </span>
                </Link>

                {/* ২. Desktop Navigation Links */}
                <nav className="hidden items-center space-x-6 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* ৩. Right Actions (User Dropdown or Login Button + CTA) */}
                <div className="hidden items-center space-x-4 lg:flex">

                    {/* Logged In User Avatar with Dropdown */}
                    {user && user.success ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="relative flex h-10 w-10 items-center justify-center rounded-full p-0 ring-2 ring-primary/20 transition hover:ring-primary">

                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user?.data?.myProfile.profile.profilePhoto} alt={user?.data?.myProfile.name || "User"} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                        {getInitials(user?.data?.myProfile.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.data?.myProfile.name || "User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user?.data?.myProfile.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link href={dashboardUrl} className="flex items-center">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link href="/profile" className="flex items-center">
                                            <UserCheck className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link href="/settings" className="flex items-center">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer text-destructive focus:text-destructive"
                                        onClick={() => {
                                            logout()
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (

                        <Button variant="ghost" className="font-semibold">
                            <Link href="/login" className="flex items-center gap-2">
                                <User className="h-4 w-4" /> Login
                            </Link>
                        </Button>
                    )}


                </div>

                {/* ৪. Mobile Menu Toggle Button */}
                <Button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="rounded-md p-2 lg:hidden text-foreground"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </Button>
            </div>

            {/* ৫. Mobile Drawer Menu */}
            {isMobileMenuOpen && (
                <div className="border-b bg-background px-4 pb-6 pt-2 lg:hidden">
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex flex-col space-y-3 pt-4 border-t">
                            {user ? (
                                <>
                                    <div className="px-2 pb-2">
                                        <p className="font-semibold text-sm">{user?.data?.myProfile?.name}</p>
                                        <p className="text-xs text-muted-foreground">{user?.data?.myProfile.email}</p>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                                    </Link>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <UserCheck className="h-4 w-4" /> Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Settings className="h-4 w-4" /> Settings
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="mt-2 w-full justify-start gap-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <LogOut className="h-4 w-4" /> Log out
                                    </Button>
                                </>
                            ) : (
                                <Button className="w-full">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        Login
                                    </Link>
                                </Button>
                            )}

                            <Button variant="outline" className="w-full mt-2">
                                <Link href="/create-listing" onClick={() => setIsMobileMenuOpen(false)}>
                                    Create a Listing
                                </Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}