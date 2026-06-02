import type {LucideIcon} from "lucide-react";

export type SearchResult = {
    id: number;
    title: string;
    category: string;
    path: string;
    icon: LucideIcon;
};
