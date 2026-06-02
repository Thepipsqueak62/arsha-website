import {NavigationItem} from "@/types/NavigationItem.type";
import {Swords, Users, Video} from "lucide-react";
import {ROUTE_PATHS} from "@/lib/routes";

export const esportsNav: NavigationItem[] = [
    {
        path: ROUTE_PATHS.PUBLIC?.TOURNAMENTS,
        label: "Tournament",
        icon: Swords,
        description: "Current & Upcoming Tournaments",
    },
    {
        path: ROUTE_PATHS.PUBLIC?.TEAMS,
        label: "Teams",
        icon: Users,
        description: "Arsha Esports Teams",
    },
    {
        path: ROUTE_PATHS.PUBLIC?.STREAMS,
        label: "Streams",
        icon: Video,
        description: "Events & Tournament Streams",
    },
];