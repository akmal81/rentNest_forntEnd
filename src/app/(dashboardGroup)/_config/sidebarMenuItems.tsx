
import { SidebarItems } from "@/types"
import { FileText, LayoutDashboard } from "lucide-react"

const TENANT_SIDEBAR_ITEM: SidebarItems[] = [
    {
        label: "Dashboard",
        href: "/dashboard/tenant",
        icon: LayoutDashboard
    },
    {
        label: "Todo Add Label",
        href: "/dashboard/tenant/request",
        icon: FileText
    },

]
const LANDLORD_SIDEBAR_ITEM: SidebarItems[] = [
    {
        label: "Dashboard",
        href: "/dashboard/landlord",
        icon: LayoutDashboard
    },
    {
        label: "Todo add lable",
        href: "/dashboard/landlord/request",
        icon: FileText
    },

]
const ADMIN_SIDEBAR_ITEM: SidebarItems[] = [
    {
        label: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard
    },
    {
        label: "todo add label",
        href: "/dashboard/admin/banunban",
        icon: FileText
    },

]

export const sidebarMenuItems = {
    TENANT: TENANT_SIDEBAR_ITEM,
    LANDLORD: LANDLORD_SIDEBAR_ITEM,
    ADMIN: ADMIN_SIDEBAR_ITEM
}