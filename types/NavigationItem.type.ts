import type {LucideIcon} from "lucide-react";

export type NavigationItem = {
    path: string;
    label: string;
    icon: LucideIcon;
    children?: NavigationItem[];
    description?: string;
};