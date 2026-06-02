import {NavigationItem} from "@/types/NavigationItem.type";
import Link from "next/link";
import {cn} from "@/lib/utils";

export const NavLink = ({
                     item,
                     currentPath,
                     onClick,
                     mobile = false,
                 }: {
    item: NavigationItem;
    currentPath: string;
    onClick?: () => void;
    mobile?: boolean;
}) => {
    const Icon     = item.icon;
    const isActive = currentPath === item.path;

    if (mobile) {
        return (
            <Link
                href={item.path}
                onClick={onClick}
                className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-primary/8 text-primary"
                        : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                )}
            >
                <Icon size={16} className="shrink-0" />
                {item.label}
            </Link>
        );
    }

    return (
        <Link
            href={item.path}
            className={cn(
                "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                isActive
                    ? "text-primary"
                    : "text-foreground/65 hover:text-foreground hover:bg-muted/50"
            )}
        >
            <Icon size={14} className="shrink-0" />
            {item.label}
            {isActive && (
                <span className="absolute -bottom-px left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
            )}
        </Link>
    );
};