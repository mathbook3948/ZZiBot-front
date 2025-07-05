'use client'

import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const UserContainer = ({
                           children,
                       }: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathName = usePathname()
    const isAdminRoute = pathName.startsWith("/admin")

    return (
        <div className={cn("min-h-screen flex items-center justify-center", !isAdminRoute ? "bg-background" : "")}>
            {children}
        </div>
    );
}

export default UserContainer