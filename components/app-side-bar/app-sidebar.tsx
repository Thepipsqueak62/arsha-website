// components/ui/app-sidebar.tsx
import {
    Home,
    Settings,
    User,
    LogOut,
    HelpCircle, LayoutDashboard
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarMenuBadge,
    SidebarInput,
    useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Menu items with icons
const navItems = [

    {
        title:"Dashboard",
        url:"/dashboard",
        icon:LayoutDashboard,
        badge:null

    },
    {
        title: "profile",
        url: "/profile",
        icon: User,
        badge: null
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        badge: null
    }
]

export function AppSidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { state, setOpenMobile, isMobile } = useSidebar() // Get isMobile and setOpenMobile
    const [search, setSearch] = useState("")

    const user = {
        name: "Alex Johnson",
        role: "Admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/signin")
    }

    // Check active route
    const isActive = (path: string) => {
        if (path === "/") return location.pathname === "/"
        return location.pathname.startsWith(path)
    }

    // Close mobile sidebar when location changes
    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }, [location.pathname, isMobile, setOpenMobile])

    // Handle navigation click - immediate close for mobile
    const handleNavClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    // Filter items based on search
    const filteredItems = search
        ? navItems.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase())
        )
        : navItems

    return (
        <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="border-r bg-white dark:bg-gray-900"
        >
            {/* Header */}
            <SidebarHeader className="border-b py-4">
                <div className="flex items-center justify-between gap-3 px-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                            <span className="font-semibold text-white text-sm">A</span>
                        </div>
                        {state === "expanded" && (
                            <div>
                                <h1 className="font-bold text-gray-900 dark:text-white text-sm">
                                    Nexus Platform
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    v2.1.0
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search - Only shows when expanded */}
                {state === "expanded" && (
                    <div className="mt-4">
                        <SidebarInput
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                    </div>
                )}
            </SidebarHeader>

            {/* Navigation Content */}
            <SidebarContent className="overflow-y-auto px-2">
                {search && state === "expanded" && (
                    <div className="mb-4 px-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {filteredItems.length} results found
                        </p>
                    </div>
                )}

                <SidebarGroup>
                    {state === "expanded" && (
                        <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Navigation
                        </SidebarGroupLabel>
                    )}

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.url)}
                                        tooltip={state === "collapsed" ? item.title : undefined}
                                        className={cn(
                                            "transition-all duration-200",
                                            isActive(item.url) && "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500"
                                        )}
                                        onClick={handleNavClick} // Add click handler to close mobile sidebar
                                    >
                                        <Link to={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            {state === "expanded" && (
                                                <span className="font-medium text-sm">
                                                    {item.title}
                                                </span>
                                            )}
                                            {item.badge && (
                                                <SidebarMenuBadge>
                                                    {item.badge}
                                                </SidebarMenuBadge>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* Help Section */}
                <SidebarGroup>
                    {state === "expanded" && (
                        <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Support
                        </SidebarGroupLabel>
                    )}

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={state === "collapsed" ? "Help" : undefined}
                                    onClick={handleNavClick} // Add click handler to close mobile sidebar
                                >
                                    <Link to="/help">
                                        <HelpCircle className="h-4 w-4" />
                                        {state === "expanded" && (
                                            <span className="font-medium text-sm">Help Center</span>
                                        )}
                                    </Link>

                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={state === "collapsed" ? "Help" : undefined}
                                    onClick={handleNavClick} // Add click handler to close mobile sidebar
                                >
                                    <Link to="/public">
                                        <Home className="h-4 w-4" />
                                        {state === "expanded" && (
                                            <span className="font-medium text-sm">HomePage</span>
                                        )}
                                    </Link>

                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* User Profile footer */}
            <SidebarFooter className="border-t py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-white dark:border-gray-800">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                                AJ
                            </AvatarFallback>
                        </Avatar>

                        {state === "expanded" && (
                            <div className="flex flex-col overflow-hidden">
                                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.role}
                                </p>
                            </div>
                        )}
                    </div>

                    {state === "expanded" && (
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    navigate("/profile")
                                    if (isMobile) {
                                        setOpenMobile(false)
                                    }
                                }}
                                className="h-8 w-8"
                            >
                                <User className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    handleLogout()
                                    if (isMobile) {
                                        setOpenMobile(false)
                                    }
                                }}
                                className="h-8 w-8"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}