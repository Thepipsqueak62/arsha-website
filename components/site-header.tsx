// components/site-header.tsx
import { SidebarTrigger } from "@/components/ui/sidebar"


export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center  px-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger />

            </div>

            <div className="ml-auto flex items-center gap-4">
                {/* Search or other header elements */}
                <div className="hidden md:block">
                </div>
                {/* Optional: User dropdown */}
                {/* <UserNav /> */}
            </div>
        </header>
    )
}