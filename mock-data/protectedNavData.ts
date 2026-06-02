import {NavigationItem} from "@/types/NavigationItem.type";
import {ROUTE_PATHS} from "@/lib/routes";
import {Swords, Users} from "lucide-react";

export const protectedNav: NavigationItem[] = [
    {
        path: ROUTE_PATHS.ARSHAAPP?.PROFILE,
        label: "Your Profile",
        icon: Swords,
        description: "Arsha Esports Profile",
    },
    {
        path: ROUTE_PATHS.ARSHAAPP?.DASHBOARD,
        label: "Dashboard",
        icon: Users,
        description: "Centralized GamerDashboard for all things Arsha Related",
    },
    {
        path: ROUTE_PATHS.ARSHAAPP?.SETTINGS,
        label: "Settings",
        icon: Users,
        description: "Account and Website Settings",
    },
];