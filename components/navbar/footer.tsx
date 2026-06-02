import React from 'react';
import Link from "next/link";
import {ROUTE_PATHS} from "@/lib/routes";

const NavbarFooter = () => {
    return (
        <div className="mt-6 flex items-center gap-4 pt-4 border-t border-border/30">
            <Link href={ROUTE_PATHS.PUBLIC.PRIVACY} className="text-[11.5px] text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href={ROUTE_PATHS.PUBLIC.PRIVACY} className="text-[11.5px] text-muted-foreground hover:text-foreground">Cookies</Link>
            <span className="ml-auto text-[11px] text-muted-foreground/40">
                                            © {new Date().getFullYear()} Proj-Ariel
                                        </span>
        </div>
    );
};
export default NavbarFooter;
