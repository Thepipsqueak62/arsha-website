import {NavigationItem} from "@/types/NavigationItem.type";
import {ROUTE_PATHS} from "@/lib/routes";
import {Home} from "lucide-react";

export const primaryNav: NavigationItem[] = [
    { path: ROUTE_PATHS.PUBLIC.MAINPAGE, label: "Home",     icon: Home },
    { path: ROUTE_PATHS.PUBLIC.ABOUT,    label: "About Us", icon: Home },
];